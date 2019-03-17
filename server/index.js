const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

const app = new Koa();

app.use(bodyParser());

const router = new Router();

router.post('/login', async (ctx, next) => {

})

let users = fs.existsSync('./static/user.json') ? JSON.parse(fs.readFileSync('./static/user.json')) : [];

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;

  if(users.length > 0) {
    users.push({
      id: users.length+1,
      username: postData.username,
      password: postData.password
    })
  }else {
    users.push({
      id: 1,
      username: postData.username,
      password: postData.password
    })
  }
  ctx.body = {
    code: 200,
    res: users,
    msg: '成功',
    status: true
  }

  fs.writeFileSync('./static/user.json', JSON.stringify(users));
})

app.use(router.routes());

app.listen(8081);