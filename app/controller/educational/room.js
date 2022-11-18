'use strict';

const Controller = require('egg').Controller;
const types = {
  1001: '教室',
  1002: '办公室',
  1003: '接待室',
  1004: '校长办公室',
};
class RoomController extends Controller {
  /**
   * 获取课程大纲
   */
  async index() {
    const where = this.ctx.request.query;
    const res = await this.ctx.service.educational.room.select();
    this.ctx.body = {
      code: 1,
      data: res.rooms.map(item => {
        return {
          ...item,
          type: types[item.type],
        };
      }),
      pagination: {
        page: where.page,
        page_size: where.page_size,
        total: res.total,
      },
    };
  }
  async create() {
    try {
      this.ctx.validate({
        room_num: 'string',
        floor: 'string',
        type: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      console.log(error);
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const { room_num, floor, type } = this.ctx.request.body;

    const insertRes = await this.ctx.service.educational.room.insert(room_num, floor, type);
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
    const delRes = await this.ctx.service.educational.room.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = RoomController;
