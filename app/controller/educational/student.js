'use strict';

const Controller = require('egg').Controller;
const city = require('./city.js');
function getCity(code) {
  const province = code.substr(0, 2) + '0000';
  const ctiyCode = code.substr(0, 4) + '00';
  const county = code.substr(0, 6);
  const address = city[province] + city['0,' + province][ctiyCode] + city['0,' + province + ',' + ctiyCode][county];
  return address;
}

const status = {
  1: '报名',
  2: '试学',
  3: '在籍',
  4: '毕业',
  5: '退学',
};
const level_object = {
  1: '市场总监',
  2: '副总监',
  3: '区域经理',
  4: '副经理',
  5: '县办主任',
  6: '副县办',
  7: '招办主任',
  8: '副招办主任',
  9: '招生老师',
  10: '校长',
};

class StudentController extends Controller {
  /**
   * 获取学生列表
   */
  async index() {
    const { ctx } = this;
    const {
      level,
      market_id,
    } = this.ctx.token;
    let studens = [];
    const tree = [];
    if (level >= 10) {
      // const res = await ctx.service.educational.student.select(1, 10, {});
      const teachers = await this.ctx.service.enterprise.market.select({
        is_market: '1',
      });
      const teacher_id = teachers.map(item => item.user_id);
      if (teacher_id.length >= 1) {
        const res = await ctx.service.educational.student.select(1, 10, {
          market_teacher_id: teacher_id,
        });
        studens = studens.concat(res.studens.map(item => {
          const teacher = teachers.filter(teacher => {
            return teacher.user_id === item.market_teacher_id;
          })[0];
          return {
            ...item,
            market: {
              id: market_id,
              teacher: {
                name: teacher.nickname,
                mobile: teacher.mobile,
              },
            },
          };
        }));
      }
      this.ctx.body = {
        code: 1,
        data: studens,
      };
    } else {
      Object.keys(level_object).forEach(item => {
        if (item >= level) {
          tree.push({
            level_id: item,
            level: level_object[item],
            students: [],
          });
        }
      });
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        const teachers = await this.ctx.service.enterprise.market.select({
          market_id,
          level: item.level_id,
          is_market: '1',
        });
        const teacher_id = teachers.map(item => item.user_id);
        if (teacher_id.length >= 1) {
          const res = await ctx.service.educational.student.select(1, 10, {
            market_teacher_id: teacher_id,
          });
          studens = studens.concat(res.studens.map(item => {
            const teacher = teachers.filter(teacher => {
              return teacher.user_id === item.market_teacher_id;
            })[0];
            return {
              ...item,
              market: {
                id: market_id,
                teacher: {
                  name: teacher.nickname,
                  mobile: teacher.mobile,
                },
              },
            };
          }));
        }
      }
      this.ctx.body = {
        code: 1,
        data: studens,
      };
    }
  }
  async list() {
    const { ctx } = this;
    const { page = 1, page_size = 10, ...where } = this.ctx.request.query;
    const res = await ctx.service.educational.student.select(
      page * 1,
      page_size * 1,
      where
    );
    this.ctx.body = {
      code: 1,
      data: res.studens.map(item => {
        console.log(item.nativePlace, item.status);

        if (!item.nativePlace || !item.status) return item;
        return {
          ...item,
          nativePlace: getCity(item.nativePlace),
          status: status[item.status],
        };
      }),
      pagination: {
        page,
        page_size,
        total: res.total,
      },
    };
  }
  /**
   * 学生报名
   */
  async create() {
    try {
      this.ctx.validate({
        name: 'string',
        id_card: 'string',
        phone: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }
    const info = this.ctx.token;
    const user_pwd = this.ctx.helper.sha256('123456');
    const insertRes = await this.ctx.service.educational.student.insert({
      ...this.ctx.request.body,
      password: user_pwd,
      market_teacher_id: info.user_id,
      market_id: info.architectures_id,
      create_time: new Date(),
    });
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
    const delRes = await this.ctx.service.educational.subject.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = StudentController;
