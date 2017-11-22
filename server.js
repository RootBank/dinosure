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
      ctx.body = { createdAt, premium, quotePackageId };
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
