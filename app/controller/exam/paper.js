'use strict';

const Controller = require('egg').Controller;
class PaperController extends Controller {
  /**
   * 获取试卷
   */
  async index() {
    const papers = await this.ctx.service.exam.paper.select();
    this.ctx.body = {
      code: 1,
      data: papers.map(item => ({
        ...item,
        students: JSON.parse(item.students).length,
        questions: JSON.parse(item.questions).length,
      })),
    };
  }

  async show() {
    const papers = await this.ctx.service.exam.paper.select(this.ctx.params.id);
    this.ctx.body = {
      code: 1,
      data: papers,
    };
  }
  async create() {
    console.log(this.ctx.request.body);
    try {
      this.ctx.validate({
        title: 'string',
        start_time: 'datetime',
        end_time: 'datetime',
        class_id: 'string',
        students: 'array',
        questions: 'array',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }

    const insertRes = await this.ctx.service.exam.paper.insert(this.ctx.request.body);
    if (insertRes) {
      this.ctx.status = 201;
      this.ctx.body = { msg: '数据插入', code: 1 };
    } else {
      this.ctx.status = 501;
      this.ctx.body = { msg: '数据插入失败', code: 0 };
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
    const delRes = await this.ctx.service.educational.class.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = PaperController;
