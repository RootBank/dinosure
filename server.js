require('dotenv').config();
const promisify = require('util').promisify;
const Koa = require('koa');
const helmet = require('koa-helmet');
const next = require('next');
var bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const axios = require('axios');
const port = parseInt(process.env.PORT, 10) || 3000;
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const ManagementClient = require('auth0').ManagementClient;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Authorization Boilerplate
const auth0config = require('./config.json');

const auth0 = new ManagementClient({
  domain: auth0config.AUTH0_CLIENT_DOMAIN,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  scope: 'read:users_app_metadata update:users_app_metadata create:users_app_metadata'
});

// This automatically fetches the authorization configuration from the auth0 tenant
const client = jwks({
  jwksUri: auth0config.AUTH0_JWKS_URI
});

const verifyJwt = async (ctx, kid, token) => {
  const key = await promisify(client.getSigningKey)(kid);
  let signingKey = key.publicKey || key.rsaPublicKey;
  let accessKey = jwt.verify(token, signingKey);
  ctx.state.user = {
    sub: accessKey.sub
  };
};

const rootClientId = process.env.ROOT_CLIENT_ID;
const rootClientSecret = process.env.ROOT_CLIENT_SECRET;
const rootUrl = process.env.ROOT_INSURANCE_URL;
const auth = { username: rootClientId, password: rootClientSecret };

app.prepare().then(() => {
  const server = new Koa();
  server.use(helmet());
  server.use(bodyParser());
  const router = new Router();

  // Error handling for api endpoints
  router.all(/^\/api\/(.*)(?:\/|$)/, async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      if (e.response && e.response.status === 400) {
        ctx.body = e.response.data;
        ctx.response.status = 400;
      } else {
        console.error(e);
        ctx.response.status = 500;
      }
    }
  });

  // Authorization middleware for user endpoint
  router.all(/^\/api\/user\/(.*)(?:\/|$)/, async (ctx, next) => {
    if (!ctx.request.headers.authorization) {
      ctx.status = 401;
      ctx.body = {
        message: 'Unauthorized'
      };
      return;
    }
    let token = ctx.request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.decode(token, {complete: true});
    let kid = decodedToken.header.kid;
    try {
      await verifyJwt(ctx, kid, token);
      const userId = { id: decodedToken.payload.sub };
      let policyholderId = (decodedToken.payload.app_metadata || {}).policyholder_id;
      if (!policyholderId) {
        policyholderId = ((await auth0.getUser(userId)).app_metadata || {}).policyholder_id;
      }
      ctx.request.authorization = { ...(policyholderId ? { policyholderId } : {}), userId };
      return next();
    } catch (e) {
      ctx.status = 403;
      ctx.body = {
        message: 'Forbidden'
      };
    }
  });

  router.post('/api/user/temp/policyholder', async(ctx, next) => {
    const policyholderId = ctx.request.body.policyholderId;
    await auth0.updateAppMetadata(ctx.request.authorization.userId, { policyholder_id: policyholderId });
    ctx.status = 200;
  });

  router.get('/api/user/policyholder', async(ctx, next) => {
    const policyholderId = ctx.request.authorization.policyholderId;
    if (ctx.request.authorization.policyholderId) {
      ctx.status = 200;
      let result = (await axios.get(`${rootUrl}/policyholders/${policyholderId}`, { auth })).data;

      const getPaymentMethodId = (events) => {
        const paymentEvents = events.filter(x => x.type === 'payment_successful');
        return paymentEvents.length > 0 ? (paymentEvents[paymentEvents.length - 1].paymentMethodId || paymentEvents[paymentEvents.length - 1].payment_method_id) : undefined;
      };

      ctx.body = {
        firstName: result.first_name,
        lastName: result.last_name,
        id: result.id.number,
        email: result.email,
        paymentMethods:
          (await axios.get(`${rootUrl}/policyholders/${policyholderId}/payment-methods`, { auth })).data.map(paymentMethod => ({
            paymentMethodId: paymentMethod.payment_method_id,
            type: paymentMethod.type,
            card: {
              bin: paymentMethod.card.bin,
              holder: paymentMethod.card.holder,
              expiryMonth: paymentMethod.card.expiry_month,
              expiryYear: paymentMethod.card.expiry_year
            }
          })),
        policies: (await axios.get(`${rootUrl}/policyholders/${policyholderId}/policies`, { auth })).data
          .filter(policy => policy.status !== 'pending_initial_payment')
          .map(policy => ({
            policyNumber: policy.policy_number,
            policyId: policy.policy_id,
            paymentMethodId: getPaymentMethodId(policy.events),
            sumAssured: policy.sum_assured,
            monthlyPremium: policy.monthly_premium,
            packageName: policy.packageName,
            policyScheduleUri: policy.policy_schedule_uri,
            termsUri: policy.terms_uri,
            beneficiaries: policy.beneficiaries,
            claims: policy.claim_ids,
            complaints: policy.complaint_ids,
            createdAt: policy.created_at,
            startDate: policy.start_date,
            endDate: policy.end_date,
            status: policy.status
          }))
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        message: 'Forbidden'
      };
    }
  });

  const getOrCreatePolicyholder = async (firstName, lastName, email, id) => {
    const policyholderBody = {
      id: {
        type: 'id',
        country: 'ZA',
        number: id
      },
      first_name: firstName,
      last_name: lastName,
      email
    };

    const potentialPolicyholder = await axios.get(`${rootUrl}/policyholders?id_number=${id}`, { auth });
    if (potentialPolicyholder.data.length > 0) {
      return potentialPolicyholder.data[0];
    } else {
      return (await axios.post(`${rootUrl}/policyholders/`, policyholderBody, { auth })).data;
    }
  };

  router.post('/api/apply', async ctx => {
    const input = ctx.request.body;
    const { quotePackageId, firstName, lastName, email, id } = input;

    let policyholder = await getOrCreatePolicyholder(firstName, lastName, email, id);

    const applicationBody = {
      policyholder_id: policyholder.policyholder_id,
      quote_package_id: quotePackageId
    };

    const application = await axios.post(`${rootUrl}/applications/`, applicationBody, { auth });

    const issuePolicyBody = { application_id: application.data.application_id };
    const policy = await axios.post(`${rootUrl}/policies/`, issuePolicyBody, { auth });

    ctx.body = { policyId: policy.data.policy_id };
    ctx.status = 200;
  });

  // Get card payment script.
  router.get('/api/card-payment.js', async ctx => {
    const policyId = ctx.request.query.policyId;
    const scriptUrl = `${rootUrl}/payment-methods/card/${rootClientId}.js?policy_id=${policyId}`;
    const script = await axios.get(scriptUrl);
    ctx.body = script.data;
    ctx.type = 'text/javascript';
    ctx.status = 200;
  });

  router.post('/api/quote', async ctx => {
    const input = ctx.request.body;

    const educationStatus =
      input.education === 'btech' || input.education === 'diploma'
      ? 'diploma_or_btech'
      : input.education;

    const quoteParams = {
      type: 'guardrisk_term',
      age: input.age,
      cover_amount: input.sumAssured * 100,
      cover_period: 'whole_life',
      basic_income_per_month: input.income * 100,
      education_status: educationStatus,
      smoker: input.smoking,
      gender: input.gender
    };
    const quoteResult = await axios.post(`${rootUrl}/quote/`, quoteParams, { auth });
    if (quoteResult.data.length > 0) {
      console.log(JSON.stringify(quoteResult.data));
      const {
        created_at: createdAt,
        suggested_premium: premium,
        quote_package_id: quotePackageId
      } = quoteResult.data[0];
      ctx.body = { createdAt, premium: Math.ceil(premium / 100) * 100, quotePackageId };
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.response.status = ctx.response.status || 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
