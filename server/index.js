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
  path: [/^\/register/, /^\/login/] //数组中的路径不需要通过jwt验证
}))


let users = fs.existsSync('./static/user.json') ? JSON.parse(fs.readFileSync('./static/user.json')) : [];

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;
  console.log(users)
  if(!!postData.username && !!postData.password) {
    if(users.length > 0) {
      let filterUser = users.some(item => item.username === postData.username);
      if(filterUser) {
        ctx.body = {
          code: 200,
          msg: '该用户名已被人占用',
          status: false
        }
      } else {
        users.push({
          id: users.length+1,
          username: postData.username,
          password: postData.password
        })
        
        ctx.body = {
          code: 200,
          msg: '成功',
          status: true
        }
      }
    }else {
      users.push({
        id: 1,
        username: postData.username,
        password: postData.password
      })
      
      ctx.body = {
        code: 200,
        msg: '成功',
        status: true
      }
    }
    fs.writeFileSync('./static/user.json', JSON.stringify(users));
  } else {
    ctx.body = {
      code: 200,
      msg: '用户名或者密码错误',
      status: false
    }
  }

})


router.post('/login', async (ctx, next) => {
  const postData = ctx.request.body;
  
  if(!!postData.username && !!postData.password) {
    let filterUser = users.filter(item => item.username === postData.username);
    if(filterUser.length > 0 && filterUser[0].password === postData.password) {
      let userToken = {
        username: postData.username
      }
      const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
      ctx.body = {
        code: 200,
        token,
        msg: '成功',
        status: true
      }
    } else {
      ctx.body = {
        code: 200,
        msg: '用户名或者密码错误',
        status: false
      }
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '用户名或者密码不能为空',
      status: false
    }
  }
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