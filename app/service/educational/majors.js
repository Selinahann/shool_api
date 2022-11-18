'use strict';

const Service = require('egg').Service;
class MajorsService extends Service {
  // 新建课程
  async insert(params) {
    const id = this.ctx.helper.randomString(2);
    const majors_params = {
      majors_id: id,
      name: params.name,
      price: params.price,
      remark: params.remark,
      duration: params.duration,
      unit: params.unit,
      create_time: new Date(),
    };
    const result = await this.app.mysql.insert('majors', majors_params);
    const create_all = [];

    if (params.subject) {
      let subject_sql = `
        INSERT INTO 
          subject (subject_id, subject_title, majors_id, order_id) 
        VALUES `;
      params.subject.forEach((item, index) => {
        const subject_id = this.ctx.helper.randomString(2);
        if (index !== 0) {
          subject_sql += ',';
        }
        subject_sql += `('${subject_id}', '${item.subject_title}', '${id}', ${index + 1})`;
        console.log(subject_sql);
        if (item.children.length >= 1) {
          let outline_sql = `
          INSERT INTO 
            outline (outline_id, outline_title, subject_id, order_id) 
          VALUES 
          `;
          item.children.forEach((outline_item, outline_index) => {
            const outline_id = this.ctx.helper.randomString(2);
            if (outline_index !== 0) {
              outline_sql += ',';
            }
            outline_sql += `('${outline_id}', '${outline_item.outline_title}', '${subject_id}', ${outline_index + 1})`;
          });
          console.log(outline_sql);
          create_all.push(this.app.mysql.query(outline_sql));
        }
      });
      create_all.push(this.app.mysql.query(subject_sql));
    }
    await Promise.all(create_all);
    return result.affectedRows === 1;
  }
  // 获取所有课程
  async select(id) {
    if (id) {
      const majors = await this.app.mysql.select('majors', {
        where: {
          majors_id: id,
        },
      });
      return majors[0];
    }
    const majors = await this.app.mysql.select('majors');
    return majors;
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('majors', { majors_id: id });
    return result.affectedRows;
  }
}
module.exports = MajorsService;
