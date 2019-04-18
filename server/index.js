const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwtKoa = require('koa-jwt');
const secret = 'jdfinance timer';
const app = new Koa();
const router = require('./router/index.js');

app.use(bodyParser());
app.use(jwtKoa({secret}).unless({
  path: [/^\/register/, /^\/login/] //数组中的路径不需要通过jwt验证
}))

app.use(router.routes());

app.listen(8081);