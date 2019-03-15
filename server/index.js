const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const app = new Koa();

app.use(bodyParser);

const router = new Router();

router.post('/login', async (ctx, next) => {

})

router.post('/register', async (ctx, next) => {
  
})

app.use(router.routes());

app.listen(8081);