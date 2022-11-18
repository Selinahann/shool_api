'use strict';

const Controller = require('egg').Controller;
class MajorsController extends Controller {
  /**
   * 获取标签
   */
  async index() {
    const majors = await this.ctx.service.educational.majors.select();
    this.ctx.body = {
      code: 1,
      data: majors,
    };
  }
  async show() {
    const id = this.ctx.params.id;
    const majors = await this.ctx.service.educational.majors.select(id);
    this.ctx.body = {
      code: 1,
      data: majors,
    };
  }
  async create() {
    try {
      this.ctx.validate({
        name: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const params = this.ctx.request.body;

    const insertRes = await this.ctx.service.educational.majors.insert(params);
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
    const delRes = await this.ctx.service.educational.majors.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = MajorsController;
