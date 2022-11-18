'use strict';

const Service = require('egg').Service;
class TagService extends Service {
  // 新建班级
  async insert(params) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('class', {
      id,
      create_time: new Date(),
      ...params,
    });
    return result.affectedRows === 1;
  }
  // 获取所有的班级
  async select() {
    const sql = `
      SELECT
        class.id AS class_id,
        class.class_name AS class_name,
        class.room_id AS room_id,
        class.teacher_id AS teacher_id,
        class.subject_id AS subject_id,
        subject.subject_title AS subject,
        room.room_num AS room_num,
        majors.name AS majors_name,
        user.user_name AS teacher_name,
        class.status AS status
      FROM
        class,
        subject,
        room,
        majors,
        user
      WHERE
        class.subject_id=subject.subject_id 
        AND 
        class.room_id=room.room_id 
        AND 
        user.user_id=class.teacher_id 
        AND 
        majors.majors_id=class.majors_id
    `;
    const schollclass = await this.app.mysql.query(sql);

    // const allstudens = await this.app.mysql.query('student');
    // return {
    //   studens,
    //   total: allstudens.length,
    // };
    return schollclass;
  }
  // 删除某个班级
  async delete(id) {
    const result = await this.app.mysql.delete('class', { class_id: id });
    return result.affectedRows;
  }

  async update(id, params) {
    const result = await this.app.mysql.update('class', { id, ...params });
    return result.affectedRows;
  }
}
module.exports = TagService;
