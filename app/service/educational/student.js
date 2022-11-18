'use strict';

const Service = require('egg').Service;
class StudentService extends Service {
  // 新建学生
  async insert(params) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('student', {
      student_id: id,
      ...params,
    });
    return result.affectedRows === 1;
  }
  // 获取学生
  async select(page, page_size, where = {}) {
    const studens = await this.app.mysql.select('student', {
      where,
      orders: [[ 'create_time', 'desc' ]], // 排序方式
      limit: page_size * 1, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量
    });
    const allstudens = await this.app.mysql.select('student');
    return {
      studens,
      total: allstudens.length,
    };
  }
  // 删除学生
  async delete(id) {
    const result = await this.app.mysql.delete('student', { student_id: id });
    return result.affectedRows;
  }
}
module.exports = StudentService;
