const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify);//解密
const secret = 'jdfinance timer';
const fs = require('fs');
const crawler = require('./crawler');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(jwtKoa({secret}).unless({
  path: [/^\/register/, /^\/login/] //数组中的路径不需要通过jwt验证
}))


let users = fs.existsSync('./static/user.json') ? JSON.parse(fs.readFileSync('./static/user.json')) : [];

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;
  
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
    let index = users.findIndex(item => item.username === postData.username);
    if(index > -1) {
      if(users[index].password === postData.password) {
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
        
        users[index].token = token;
        fs.writeFileSync('./static/user.json', JSON.stringify(users));
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
        msg: '该用户未注册',
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

router.get('/userInfo', async(ctx, next) => {
  verifyToken(ctx, ctx.header.authorization);
  
  const userInfo = users.find(item => {
    return item.token === ctx.header.authorization.split(' ')[1]
  });
  
  delete userInfo.password;

  if(userInfo) {
    ctx.body = {
      code: 200,
      msg:'成功',
      res: userInfo,
      status: true
    }
  }
})

router.get('/home', async(ctx, next) => {
  //爬取数据
  const data = await crawler();
  if(data.length > 0) {
    ctx.body = {
      code: 200,
      msg: '成功',
      status: true,
      res: data
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '失败',
      status: false
    }
  }
})




async function verifyToken(ctx, token) {
  let payload;
  if(token) {
    payload = await verify(token.split(' ')[1], secret);
    
    const curTime = new Date().getTime().toString().substr(0,10);

    if(payload.exp < curTime) {
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