'use strict';

const jwt = require('jsonwebtoken');
const checkWhiteList = require('../utils/checkWhiteList');
function verifyToken(token, secret) {
  return new Promise((reslove, reject) => {
    jwt.verify(token, secret, (err, info) => {
      if (!err) {
        reslove(info);
      } else {
        reject(err);
      }
    });
  });
}
module.exports = () => {
  return async (ctx, next) => {
    // 验证超级白名单
    console.log(checkWhiteList(ctx.path, ctx.method, ctx.app.config.whiteList), 'aaa');
    if (checkWhiteList(ctx.path, ctx.method, ctx.app.config.whiteList)) {
      await next();
      return;
    }
    // 验证登录白名单
    if (checkWhiteList(ctx.url, ctx.method, ctx.app.config.loginWhiteList)) {
      await next();
      return;
    }
    const Authorization = ctx.cookies.get('token') || ctx.header.token;
    if (!Authorization) {
      ctx.status = 401;
      ctx.body = { msg: '用户未登录', code: 0 };
      return;
    }
    const secret = ctx.helper.createKeys();
    let userInfo = null;
    try {
      // 老师的信息 {user_name,user_id,signTime,identity_text,identity_id}
      // 学生的信息 {student_name,student_id,signTime}
      userInfo = await verifyToken(Authorization, secret);
    } catch (err) {
      ctx.status = 401;
      ctx.body = { msg: '权限信息可能被篡改', code: 0 };
      return;
    }

    // 验证token是否过期
    const { signTime } = userInfo;
    const nowTime = new Date().getTime();
    const time = (nowTime - signTime) / 1000 / 60 / 60;
    if (time >= 5) { // 超时2小时
      ctx.status = 401;
      ctx.body = { msg: '权限信息过期', code: 0 };
      return;
    }
    // 把用户信息存入ctx.token中
    ctx.token = userInfo;
    await next();

  };
};
