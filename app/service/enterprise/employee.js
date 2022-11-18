'use strict';

const Service = require('egg').Service;
class EmployeeService extends Service {
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
  // 获取所有员工
  async select(page, page_size, where) {
    console.log(where, '123');
    const employee = await this.app.mysql.select('user', {
      where,
      limit: (page - 1) * page_size, // 返回数据量
      offset: page_size * 1, // 数据偏移量
    });
    const allemployee = await this.app.mysql.select('user', {
      where,
    });
    return {
      employee,
      total: allemployee.length,
    };
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('user', { user_id: id });
    return result.affectedRows;
  }
}
module.exports = EmployeeService;
