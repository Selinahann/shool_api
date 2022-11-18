'use strict';

const Service = require('egg').Service;
class SubjectService extends Service {
  // 新建大纲
  async insert(outline_title, subject_id, order_id) {
    const id = this.ctx.helper.randomString(2);
    const result = await this.app.mysql.insert('outline', {
      outline_id: id,
      outline_title, subject_id, order_id,
    });
    return result.affectedRows === 1;
  }
  // 获取课程大纲
  async select(subject_id) {
    if (subject_id) {
      const outline = await this.app.mysql.select('outline', {
        where: {
          subject_id,
        },
        orders: [[ 'order_id', 'desc' ]], // 排序方式
      });
      return outline;
    }
    const majors = await this.service.educational.majors.select();
    const subject = await this.service.educational.subject.select();
    const outline = await this.app.mysql.select('outline', {
      orders: [[ 'order_id', 'asc' ]],
    });
    const data = majors.map(item => {
      const majors_id = item.majors_id;
      const children = subject.reduce((prev, subject_item) => {
        const subject_children = outline.reduce((outline_prev, outline_item) => {
          if (subject_item.subject_id === outline_item.subject_id) {
            outline_prev.push({
              value: outline_item.outline_id,
              label: outline_item.outline_title,
            });
          }
          return outline_prev;
        }, []);
        if (subject_item.majors_id === majors_id) {
          prev.push({
            value: subject_item.subject_id,
            label: subject_item.subject_title,
            children: subject_children,
          });
        }
        return prev;
      }, []);
      return {
        value: majors_id,
        label: item.name,
        children,
      };
    });
    return data;
  }
  // 删除某个大纲章节
  async delete(id) {
    const result = await this.app.mysql.delete('outline', { outline_id: id });
    return result.affectedRows;
  }
}
module.exports = SubjectService;
