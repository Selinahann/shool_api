'use strict';

const Service = require('egg').Service;
class MarketService extends Service {
  // 添加员工
  async insert(userInfo) {
    const user_id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('user', {
      ...userInfo,
      create_time: new Date(),
      user_id,
    });
    return {
      row: result.affectedRows,
      user_id,
    };
  }
  // 获取市场架构
  async select(where) {
    const users = await this.app.mysql.select('user', {
      where,
    });
    return users;
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('user', { user_id: id });
    return result.affectedRows;
  }
}
module.exports = MarketService;
