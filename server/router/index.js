
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);//解密
const fs = require('fs');
const crawler = require('../crawler');
const resJson = require('../static/config/text.js');
const secret = 'jdfinance timer';

const router = new Router();

let users = fs.existsSync('./static/user.json') ? JSON.parse(fs.readFileSync('./static/user.json')) : [];

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;
  
  if(!!postData.username && !!postData.password) {
    if(users.length > 0) {
      let filterUser = users.some(item => item.username === postData.username);
      if(filterUser) {
        ctx.body = resJson.registered
      } else {
        users.push({
          id: users.length+1,
          username: postData.username,
          password: postData.password
        })
        
        ctx.body = resJson.success
      }
    }else {
      users.push({
        id: 1,
        username: postData.username,
        password: postData.password
      })
      
      ctx.body = resJson.success
    }
    fs.writeFileSync('./static/user.json', JSON.stringify(users));
  } else {
    ctx.body = resJson.inputError
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
  
        let res = {...resJson.success, token}
        ctx.body = res
        
        users[index].token = token;
        fs.writeFileSync('./static/user.json', JSON.stringify(users));
      } else {
        ctx.body = resJson.inputError
      }

    } else {
      ctx.body = resJson.noReg
    }
  } else {
    ctx.body = resJson.inputEmity
  }
})

router.get('/userInfo', async(ctx, next) => {
  console.log(ctx.header.authorization)
  verifyToken(ctx, ctx.header.authorization);
  
  const userInfo = users.find(item => {
    return item.token === ctx.header.authorization.split(' ')[1]
  });
  
  delete userInfo.password;

  if(userInfo) {
    let res = {...resJson.success, res:userInfo}
    ctx.body = res
  }
})

router.get('/home', async(ctx, next) => {
  //爬取数据
  const data = await crawler();
  
  if(!!data) {
    let res = {...resJson.success, res:data}
    ctx.body = res
  } else {
    ctx.body = resJson.failed
  }
})



/* 验证token */
async function verifyToken(ctx, token) {
  let payload;
  if(token) {
    payload = await verify(token.split(' ')[1], secret);
    
    const curTime = new Date().getTime().toString().substr(0,10);

    if(payload.exp < curTime) {
      ctx.body = resJson.tokenExpired;
      ctx.status = 401;
    }
  } else {
    ctx.body = resJson.tokenCheckF;
    ctx.status = 401;
  }
}

module.exports = router;