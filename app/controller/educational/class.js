'use strict';

const Controller = require('egg').Controller;
class ClassController extends Controller {
  async index() {
    const tags = await this.ctx.service.educational.class.select();
    this.ctx.body = {
      code: 1,
      data: tags,
    };
  }
  async create() {

    try {
      this.ctx.validate({
        class_name: 'string',
        subject_id: 'string',
        teacher_id: 'string',
        room_id: 'string',
        majors_id: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }

    const insertRes = await this.ctx.service.educational.class.insert(this.ctx.request.body);
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
  async update() {
    const delRes = await this.ctx.service.educational.class.update(this.ctx.params.id, this.ctx.request.body);
    this.ctx.body = delRes === 1 ? { msg: '编程成功', code: 1 } : { msg: '编辑失败', code: 0 };
  }
}
module.exports = ClassController;
