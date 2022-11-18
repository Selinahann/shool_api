'use strict';

const Controller = require('egg').Controller;

const findeCategoryId = (tree, id, flag = false) => {
  let ids = [];
  for (let i = 0; i < tree.length; i++) {
    const treeItem = tree[i];
    if (flag) {
      ids.push(treeItem.architectures_id);
      if (treeItem.children) {
        ids = ids.concat(findeCategoryId(treeItem.children, id, true));
      }
    } else {
      if (treeItem.architectures_id === id) {
        ids.push(id);
        if (treeItem.children) {
          ids = ids.concat(findeCategoryId(treeItem.children, id, true));
        }
        break;
      } else {
        if (treeItem.children) {
          ids = ids.concat(findeCategoryId(treeItem.children, id, false));
        }
      }
    }
  }
  return ids;
};

class EmployeeController extends Controller {
  async index() {
    const { page, page_size, ...where } = this.ctx.request.query;
    if (where.architectures_id) {
      let architectures = await this.ctx.service.enterprise.architectures.select();
      architectures = this.ctx.helper.arrayToTree(architectures, 'parent_id', 'architectures_id');

      where.architectures_id = findeCategoryId(architectures, where.architectures_id);
    }
    console.log(where.architectures_id);
    const {
      employee,
      total,
    } = await this.ctx.service.enterprise.employee.select(page, page_size, where);
    this.ctx.body = {
      code: 1,
      data: employee,
      pagination: {
        page: page || 1,
        page_size: page_size || 10,
        total,
      },
    };
  }
  async create() {

    try {
      this.ctx.validate({
        user_name: 'string',
        id_card: 'string',
        sex: 'number',
        mobile: 'string',
        nation: 'string',
        native_place: 'string',
        specialty: 'string',
        education: 'string',
        architectures_id: 'string',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }

    const user_pwd = this.ctx.helper.sha256('123456');
    const data = {
      user_name: this.ctx.request.body.mobile,
      market_id: this.ctx.request.body.architectures_id,
      ...this.ctx.request.body,
    };
    const insertRes = await this.ctx.service.enterprise.employee.insert({
      ...data,
      user_pwd,
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
    const delRes = await this.ctx.service.enterprise.employee.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
  async update() {
    const delRes = await this.ctx.service.educational.class.update(this.ctx.params.id, this.ctx.request.body);
    this.ctx.body = delRes === 1 ? { msg: '编程成功', code: 1 } : { msg: '编辑失败', code: 0 };
  }
}
module.exports = EmployeeController;
