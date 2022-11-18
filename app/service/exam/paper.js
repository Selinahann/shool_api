'use strict';

const Service = require('egg').Service;
class SubjectService extends Service {
  // 创建试卷
  async insert(params) {
    const id = this.ctx.helper.randomString(2);

    const result = await this.app.mysql.insert('paper', {
      id,
      ...params,
      questions: JSON.stringify(params.questions),
      students: JSON.stringify(params.students),
    });
    return result.affectedRows === 1;
  }


  // 获取所有试卷
  async select(id) {
    if (id) {
      const paper = await this.app.mysql.get('paper', { id });
      const questions = await this.ctx.service.question.list.select({
        id: JSON.parse(paper.questions).map(item => item.id),
      });
      paper.questions = questions;
      return paper;
    }
    const papers = await this.app.mysql.select('paper');
    return papers;
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('subject', { class_id: id });
    return result.affectedRows;
  }
}
module.exports = SubjectService;
