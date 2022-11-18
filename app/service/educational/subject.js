'use strict';

const Service = require('egg').Service;
class SubjectService extends Service {
  // 新建课程
  async insert(subject_title, majors_id, order) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('subject', {
      subject_id: id,
      subject_title,
      majors_id,
      order,
    });
    return result.affectedRows === 1;
  }
  async create_subject(subject, majors_id) {
    const create_all = [];
    let subject_sql = `
      INSERT INTO 
        subject (subject_id, subject_title, majors_id, order_id) 
      VALUES `;
    subject.forEach((item, index) => {
      const subject_id = this.ctx.helper.randomString(2);
      if (index !== 0) {
        subject_sql += ',';
      }
      subject_sql += `('${subject_id}', '${item.subject_title}', '${majors_id}', ${index + 1})`;
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
    await Promise.all(create_all);
  }
  // 获取专业课程
  async select(majors_id) {
    if (majors_id) {
      const subject = await this.app.mysql.select('subject', {
        where: {
          majors_id,
        },
      });
      const outline = await this.app.mysql.select('outline', {
        orders: [[ 'order_id', 'asc' ]],
      });
      subject.forEach(subject_item => {
        subject_item.children = outline.reduce((outline_prev, outline_item) => {
          if (subject_item.subject_id === outline_item.subject_id) {
            outline_prev.push(outline_item);
          }
          return outline_prev;
        }, []);
      });

      return subject;
    }
    const subject = await this.app.mysql.select('subject');
    return subject;
  }
  // 删除某个课程
  async delete(id) {
    const result = await this.app.mysql.delete('subject', { subject_id: id });
    return result.affectedRows;
  }
}
module.exports = SubjectService;
