'use strict';

const Service = require('egg').Service;
class ArchitecturesService extends Service {
  // 添加员工
  async insert(params) {
    const architectures_id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('architectures', {
      architectures_id,
      ...params,
    });
    return {
      row: result.affectedRows,
    };
  }
  // 获取所有员工
  async select(where = {}) {
    const architectures = await this.app.mysql.select('architectures', { where });
    return architectures;
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('architectures', { architectures_id: id });
    return result.affectedRows;
  }
}
module.exports = ArchitecturesService;
