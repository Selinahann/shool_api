'use strict';

const Service = require('egg').Service;
class RoomService extends Service {
  // 新建课程
  async insert(room_num, floor, type) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('room', {
      room_id: id,
      room_num,
      floor,
      type,
    });
    return result.affectedRows === 1;
  }
  // 获取专业课程
  async select(where) {
    const rooms = await this.app.mysql.select('room', {
      where,
    });
    const allrooms = await this.app.mysql.select('room');
    return {
      rooms,
      total: allrooms.length,
    };
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('room', { room_id: id });
    return result.affectedRows;
  }
}
module.exports = RoomService;
