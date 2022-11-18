'use strict';

const Service = require('egg').Service;
class TagService extends Service {
  // 插入试题标签
  async insert(text, color) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('question_tag', {
      id,
      text,
      color,
    });
    return result.affectedRows === 1;
  }
  // 获取所有的试题标签
  async select() {
    const tags = await this.app.mysql.select('question_tag');
    return tags;
  }
  // 试题的标签是否重复
  async isRepeat(text) {
    const checkRes = await this.app.mysql.query('select * from question_tag where text=?', [ text ]);
    return checkRes.length !== 0;
  }
  // 删除某个试题标签
  async delete(id) {
    const result = await this.app.mysql.delete('question_tag', { id });
    return result.affectedRows;
  }
}
module.exports = TagService;
