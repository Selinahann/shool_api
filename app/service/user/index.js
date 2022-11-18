'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 添加用户
  async createUser(userInfo) {
    const isRepeat = await this.isRepeat('user', 'user_name', userInfo.user_name);
    if (isRepeat) {
      return 'repeat';
    }
    const user_id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('user', {
      ...userInfo,
      user_id,
    });
    return {
      row: result.affectedRows,
      user_id,
    };
  }
  // 更新用户
  async updateUser(user_id, willUpdated) {
    const result = await this.app.mysql.update('user', willUpdated, {
      where: {
        user_id,
      },
    });
    return result.affectedRows;
  }
  async isRepeat(tableName, key, value) {
    const result = await this.app.mysql.select(tableName, {
      where: {
        [key]: value,
      },
    });
    return result.length !== 0;
  }
  async show(param) {
    if (param === 'user') { // 读取用户数据
      const sql = 'select user_name,user_pwd,user_id,identity.identity_text as identity_text from user,identity where user.identity_id=identity.identity_id';
      const result = await this.app.mysql.query(sql);
      const sqlUser = 'select user_name,user_pwd,user_id,identity_id as identity_text from user where identity_id is null';
      const resultUser = await this.app.mysql.query(sqlUser);
      return [ ...result, ...resultUser ];
    } else if (param === 'identity_api_authority_relation') {
      const sql = 'select identity_api_authority_relation_id,identity_text,api_authority_text,api_authority_url,api_authority_method from identity_api_authority_relation,identity,api_authority where identity_api_authority_relation.identity_id=identity.identity_id And identity_api_authority_relation.api_authority_id=api_authority.api_authority_id';
      const result = await this.app.mysql.query(sql);
      return result;
    } else if (param === 'userInfo') { // 获取当前的用户信息
      return this.ctx.token;
    } else if (param === 'identity_view_authority_relation') {
      const sql = 'select identity_view_authority_relation_id,identity_text,view_authority_text,view_id from identity_view_authority_relation,identity,view_authority where identity_view_authority_relation.identity_id=identity.identity_id And identity_view_authority_relation.view_authority_id=view_authority.view_authority_id';
      const result = await this.app.mysql.query(sql);
      return result;
    }
    const result = await this.app.mysql.select(param);
    return result;

  }

  async addAuthorityView(info) {
    const {
      view_authority_text,
      view_id,
    } = info;
    const textRepeat = await this.isRepeat('view_authority', 'view_authority_text', view_authority_text);
    if (textRepeat) {
      return 'repeat';
    }
    const idRepeat = await this.isRepeat('view_authority', 'view_id', view_id);
    if (idRepeat) {
      return 'repeat';
    }
    const view_authority_id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('view_authority', {
      ...info,
      view_authority_id,
    });
    return {
      row: result.affectedRows,
      view_authority_id,
    };
  }
  // 为身份设定视图权限
  async setIdentityView(info) {
    const result = await this.app.mysql.update('architectures', {
      view_authority: JSON.stringify(info.view_authority),
    }, {
      where: {
        architectures_id: info.architectures_id,
      },
    });
    return result.affectedRows;
  }
}
module.exports = UserService;
