require('dotenv').config();
const Koa = require('koa');
const helmet = require('koa-helmet');
const next = require('next');
var bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const axios = require('axios');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const rootClientId = process.env.ROOT_CLIENT_ID;
const rootClientSecret = process.env.ROOT_CLIENT_SECRET;
const rootUrl = process.env.ROOT_INSURANCE_URL;
const auth = { username: rootClientId, password: rootClientSecret };

app.prepare()
.then(() => {
  const server = new Koa();
  server.use(helmet());
  server.use(bodyParser());
  const router = new Router();

  // Error handling for api endpoints
  router.use('/api/*', async (ctx, next) => {
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
