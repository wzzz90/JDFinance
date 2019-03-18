const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify);//解密
const secret = 'jdfinance timer';
const fs = require('fs');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(jwtKoa({secret}).unless({
  path: [/^\/register/] //数组中的路径不需要通过jwt验证
}))


router.post('/login', async (ctx, next) => {

})

let users = fs.existsSync('./static/user.json') ? JSON.parse(fs.readFileSync('./static/user.json')) : [];

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;
  if(!!postData.username && !!postData.password) {
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

    let userToken = {
      username: postData.username
    }
    const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
    ctx.body = {
      code: 200,
      token: token,
      msg: '成功',
      status: true
    }
    
    
    fs.writeFileSync('./static/user.json', JSON.stringify(users));
  } else {
    ctx.body = {
      code: 200,
      token: null,
      msg: '用户名或者密码错误',
      status: false
    }
  }
  console.log(ctx.body)

})

router.post('/list', async (ctx, next) => {
  ctx.body = {
    code: 200
  }
  verifyToken(ctx, ctx.header.authorization)
})

async function verifyToken(ctx, token) {
  let payload;
  if(token) {
    payload = await verify(token.split(' ')[1], secret);
    const curTime = new Date().getTime().toString().substr(0,10);
    if(payload.exp > curTime) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg:'token已过期',
        status: false
      }
    }
  } else {
    ctx.status = 401
    ctx.body = {
      code: 401,
      msg:'token验证失败',
      status: false
    }
  }
}

app.use(router.routes());

app.listen(8081);