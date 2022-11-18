'use strict';

const Controller = require('egg').Controller;
class ArchitecturesController extends Controller {
  async index() {
    const data = await this.ctx.service.enterprise.architectures.select();
    this.ctx.body = {
      code: 1,
      data: this.ctx.helper.arrayToTree(data, 'parent_id', 'architectures_id'),
    };
  }
  async create() {

    try {
      this.ctx.validate({
        architectures_name: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const {
      architectures_name,
      parent_id = 0,
    } = this.ctx.request.body;

    const insertRes = await this.ctx.service.enterprise.architectures.insert({
      architectures_name,
      parent_id,
    });
    if (insertRes) {
      this.ctx.status = 201;
      this.ctx.body = { msg: '创建成功', code: 1 };
    } else {
      this.ctx.status = 501;
      this.ctx.body = { msg: '创建失败', code: 0 };
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
    const delRes = await this.ctx.service.enterprise.architectures.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
  async update() {
    const delRes = await this.ctx.service.educational.class.update(this.ctx.params.id, this.ctx.request.body);
    this.ctx.body = delRes === 1 ? { msg: '编程成功', code: 1 } : { msg: '编辑失败', code: 0 };
  }
}
module.exports = ArchitecturesController;
