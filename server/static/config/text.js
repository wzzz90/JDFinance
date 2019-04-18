let resTxtJson = {
  "success": {
    code: 200,
    msg: '成功',
    status: true
  },
  "failed": {
    code: 200,
    msg: '失败',
    status: false
  },
  "inputError": {
    code: 200,
    msg: '用户名或者密码错误',
    status: false
  },
  "inputEmity": {
    code: 200,
    msg: '用户名或者密码不能为空',
    status: false
  },
  "registered":{
    code: 200,
    msg: '该手机号已被注册',
    status: false
  },
  "noReg": {
    code: 200,
    msg: '该用户未注册',
    status: false
  },
  "tokenCheckF": {
    code: 401,
    msg:'token验证失败',
    status: false
  },
  "tokenExpired": {
    code: 401,
    msg:'token已过期',
    status: false
  }
}


module.exports = resTxtJson;