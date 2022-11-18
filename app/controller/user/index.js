'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const level_object = {
  1: '市场总监',
  2: '副总监',
  3: '区域经理',
  4: '副经理',
  5: '县办主任',
  6: '副县办',
  7: '招办主任',
  8: '副招办主任',
  9: '招生老师',
  10: '校长',
};

class UserController extends Controller {
  async login() {
    try {
      this.ctx.validate({ user_name: 'string', user_pwd: 'string' });
    } catch (err) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '用户名密码不正确', code: 0, err };
      return;
    }
    // 验证是否有用户名和密码
    let { user_name, user_pwd } = this.ctx.request.body;
    user_pwd = this.ctx.helper.sha256(user_pwd);
    const userResult = await this.app.mysql.select('user', { where: { user_name } });
    console.log(userResult);
    if (userResult.length === 0) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '用户不存在', code: 0 };
      return;
    }
    // console.log(userResult[0].user_pwd);
    if (userResult[0].user_pwd !== user_pwd) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '密码不正确', code: 0 };
      return;
    }
    const architectures = await this.ctx.service.enterprise.architectures.select({
      architectures_id: userResult[0].market_id,
    });
    const userInfo = userResult[0];
    userInfo.architectures = architectures[0];
    userInfo.level_name = level_object[userResult[0].level];
    // const identityResult = await this.app.mysql.select('identity', { where: { identity_id } });
    // const identity_text = identityResult[0].identity_text;
    // const userInfo = {
    //   signTime: new Date().getTime(),
    //   user_id,
    //   user_name,
    //   identity_id,
    //   // identity_text,
    // };
    // 签发token
    const token = jwt.sign({ ...userInfo }, this.ctx.helper.createKeys());
    this.ctx.cookies.set('token', token, {
      httpOnly: false,
    });
    this.ctx.body = { msg: '登录成功', token, code: 1 };

  }
  /**
     * 创建用户
     * /user
     * POST
     * {user_name,user_pwd,identity_id(非必须)}
     */
  async create() {
    try {
      this.ctx.validate({ user_name: 'string', user_pwd: 'string' });
    } catch (err) {
      this.ctx.status = 422;
      this.ctx.body = { code: 0, msg: '参数有误', err };
      return;
    }
    const { user_pwd } = this.ctx.request.body;
    this.ctx.request.body.user_pwd = this.ctx.helper.sha256(user_pwd);
    const result = await this.ctx.service.user.index.createUser(this.ctx.request.body);
    if (result === 'repeat') {
      this.ctx.status = 422;
      this.ctx.body = { code: 0, msg: '用户名重复' };
    } else if (result.row === 1) {
      this.ctx.body = { code: 1, msg: '用户添加成功', user_id: result.user_id };
    } else if (result.row === 0) {
      this.ctx.status = 422;
      this.ctx.body = { code: 0, msg: '用户添加失败，可能是数据库原因' };
    }
  }
  /**
     * 更新用户(可更新用户名、用户密码、用户身份)
     * /user/user   {user_id,user_name/user_pwd/identity_id}
     * PUT
     */
  async update() {
    const request = this.ctx.request;
    const { user_id } = request.body;
    const willUpdated = { ...request.body };
    if (willUpdated.user_pwd) {
      willUpdated.user_pwd = this.ctx.helper.sha256(willUpdated.user_pwd);
    }
    delete willUpdated.user_id;
    const result = await this.ctx.service.user.user.updateUser(user_id, willUpdated);
    if (result === 'repeat') {
      this.ctx.status = 422;
      this.ctx.body = { msg: '用户名重复', code: 0 };
    } else if (result === 1) {
      this.ctx.body = { msg: '更新成功', code: 1 };
    } else if (result === 0) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '更新失败，可能是数据库原因', code: 0 };
    }
  }

  async info() {
    this.ctx.body = this.ctx.token;
  }
  /**
     * 展示数据(用户，身份，api权限)
     * /user/user 展示所有的用户
     * /user/identity 展示所有的身份（角色)
     * /user/api_authority 展示所有的api接口
     * /user/identity_api_authority_relation 展示api接口和身份（角色）之间的关系
     * /user/identity_view_authority_relation 展示视图和身份（角色）之间的关系
     * /user/view_authority 获取视图权限
     * /user/user获取用户信息
     * GETInfo
     */
  async show() {
    const param = this.ctx.params.id;
    const result = await this.ctx.service.user.index.show(param);
    this.ctx.body = { msg: '数据获取成功', code: 1, data: result };
  }

  async addAuthorityView() {
    const { request } = this.ctx;
    this.ctx.validate({ view_authority_text: 'string', view_id: 'string' }, request.query);
    const result = await this.ctx.service.user.index.addAuthorityView(request.query);
    if (result === 'repeat') {
      this.ctx.body = { code: 0, msg: '视图权限重复' };
    } else if (result.row === 1) {
      this.ctx.body = { code: 1, msg: '添加视图权限成功', view_authority_id: result.view_authority_id };
    } else if (result.row === 0) {
      this.ctx.body = { code: 0, msg: '视图权限添加失败，可能是数据库原因' };
    }
  }

  /**
     * 为身份设定视图权限
     * /user/setIdentityView
     * POST
     * {identity_id,view_authority_id}
     */
  async setIdentityView() {
    const result = await this.service.user.index.setIdentityView(this.ctx.request.body);
    if (result === 'repeat') {
      this.ctx.body = { msg: '身份权限重复', code: 0 };
    } else if (result === 1) {
      this.ctx.body = { msg: '设定成功', code: 1 };
    } else if (result === 0) {
      this.ctx.body = { msg: '设定失败,可能是数据库原因', code: 0 };
    }
  }

  async getIdentityView() {
    const architectures_id = this.ctx.request.query.architectures_id;
    if (architectures_id) {
      const res = await this.app.mysql.get('architectures', { architectures_id });
      if (!res.view_authority) {
        this.ctx.body = {
          code: 1,
          data: [],
        };
      } else {
        const view = await this.app.mysql.select('view_authority', {
          where: {
            view_id: res.view_authority ? JSON.parse(res.view_authority) : [],
          },
        });
        this.ctx.body = {
          code: 1,
          data: view,
        };
      }
    } else {
      const info = this.ctx.token;
      const res = await this.app.mysql.get('architectures', { architectures_id: info.architectures_id });
      const view = await this.app.mysql.select('view_authority', {
        where: {
          view_id: res.view_authority ? JSON.parse(res.view_authority) : [],
        },
      });
      this.ctx.body = {
        code: 1,
        data: view,
      };
    }
  }
  // async upload() {}
}
module.exports = UserController;
