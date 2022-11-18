'use strict';

const Service = require('egg').Service;
class TypeService extends Service {
  // 插入试题类型
  async insert(text) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('question_type', {
      question_type_id: id,
      question_type_text: text,
    });
    return result.affectedRows === 1;
  }
  // 获取所有的试题类型
  async select() {
    const types = await this.app.mysql.select('question_type');
    return types;
  }
  // 试题的类型是否重复
  async isRepeat(text) {
    const checkRes = await this.app.mysql.query('select * from question_type where question_type_text=?', [ text ]);
    return checkRes.length !== 0;
  }
  // 删除某个试题类型
  async delete(id) {
    const result = await this.app.mysql.delete('question_type', { question_type_id: id });
    return result.affectedRows;
  }
}
module.exports = TypeService;
