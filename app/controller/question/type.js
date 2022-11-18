'use strict';

const Controller = require('egg').Controller;
class QuestionTypeController extends Controller {
  async index() {
    const types = await this.ctx.service.question.type.select();
    this.ctx.body = {
      msg: '数据获取成功',
      code: 1,
      data: types,
    };
  }
  async create() {
    try {
      this.ctx.validate({ text: 'string' }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }

    const { text } = this.ctx.request.body;
    const isRepeat = await this.ctx.service.question.type.isRepeat(text);
    if (isRepeat) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '标签名称重复', code: 0 };
      return;
    }
    const insertRes = await this.ctx.service.question.type.insert(text);
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
    const delRes = await this.ctx.service.question.type.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = QuestionTypeController;
