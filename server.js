require('dotenv').config();
const Koa = require('koa');
const helmet = require('koa-helmet');
const next = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const rootClientId = process.env.ROOT_CLIENT_ID;
// const rootClientSecret = process.env.ROOT_CLIENT_SECRET;
// const rootUrl = process.env.ROOT_INSURANCE_URL;

app.prepare()
.then(() => {
  const server = new Koa();
  server.use(helmet());
  const router = new Router();

  router.post('/api/quote', ctx => {
    ctx.res.statusCode = 200;
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = ctx.res.statusCode || 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
