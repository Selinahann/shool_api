'use strict';

const Controller = require('egg').Controller;
class SubjectController extends Controller {
  /**
   * 获取课程
   */
  async index() {
    const { ctx } = this;
    const majors_id = ctx.query.majors_id;
    console.log(majors_id);
    const subject = await this.ctx.service.educational.subject.select(majors_id);
    this.ctx.body = {
      code: 1,
      data: subject,
    };
  }
  async create() {
    try {
      this.ctx.validate({
        majors_id: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const { subject_title, majors_id, order, subject } = this.ctx.request.body;
    if (subject) {
      const insertRes = await this.ctx.service.educational.subject.create_subject(subject, majors_id);
      if (insertRes) {
        this.ctx.status = 201;
        this.ctx.body = { msg: '数据插入', code: 1 };
      } else {
        this.ctx.status = 501;
        this.ctx.body = { msg: '数据插入失败', code: 0 };
      }
    } else {
      const insertRes = await this.ctx.service.educational.subject.insert(subject_title, majors_id, order);
      if (insertRes) {
        this.ctx.status = 201;
        this.ctx.body = { msg: '数据插入', code: 1 };
      } else {
        this.ctx.status = 501;
        this.ctx.body = { msg: '数据插入失败', code: 0 };
      }
    }
  }
  async destroy() {
    try {
      this.ctx.validate({ id: 'string' }, this.ctx.params);
    } catch (err) {
      this.ctx.status = 401;
      this.ctx.body = { msg: 'id传递不正确', code: 0 };
      return;
    }
    const delRes = await this.ctx.service.educational.subject.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = SubjectController;
