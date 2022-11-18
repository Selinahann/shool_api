'use strict';

const Controller = require('egg').Controller;
class OutlineController extends Controller {
  /**
   * 获取课程大纲
   */
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const tags = await this.ctx.service.educational.outline.select(id);
    this.ctx.body = {
      code: 1,
      data: tags,
    };
  }
  async create() {
    try {
      this.ctx.validate({
        outline_title: 'string',
        order_id: 'string',
        subject_id: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const { outline_title, order_id, subject_id } = this.ctx.request.body;

    const insertRes = await this.ctx.service.educational.outline.insert(outline_title, subject_id, order_id);
    if (insertRes) {
      this.ctx.status = 201;
      this.ctx.body = { msg: '添加成功', code: 1 };
    } else {
      this.ctx.status = 501;
      this.ctx.body = { msg: '添加失败', code: 0 };
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
    const delRes = await this.ctx.service.educational.outline.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = OutlineController;
