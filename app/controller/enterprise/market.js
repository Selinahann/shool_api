'use strict';

const Controller = require('egg').Controller;
const city = require('./city.js');
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

function getCity(code) {
  const province = code.substr(0, 2) + '0000';
  const ctiyCode = code.substr(0, 4) + '00';
  const county = code.substr(0, 6);
  const address = city[province] + city['0,' + province][ctiyCode] + city['0,' + province + ',' + ctiyCode][county];
  return address;
}
class MarketController extends Controller {
  async index() {
    let {
      level,
      market_id,
      user_id,
    } = this.ctx.token;

    if (this.ctx.query.market_id) {
      market_id = this.ctx.query.market_id;
      level = 1;
    }

    let tree = [];
    if (level * 1 === 10) {
      tree = await this.ctx.service.enterprise.architectures.select({
        parent_id: market_id,
      });
      for (let i = 0; i < tree.length; i++) {
        if (i >= 9) break;
        const item = tree[i];
        const member = await this.ctx.service.enterprise.market.select({
          market_id: item.architectures_id,
        });
        item.member = [ ...member ].map(item => {
          return {
            ...item,
            photo: JSON.parse(item.photo)[0] && JSON.parse(item.photo)[0].url,
            native_place: getCity(item.native_place),
          };
        });
      }
    } else {
      Object.keys(level_object).forEach(item => {
        if (item >= 10) return;
        if (item >= level) {
          tree.push({
            level_id: item,
            level: level_object[item],
            member: [],
          });
        }
      });
      var parent_user = []
      for (let i = 0; i < tree.length; i++) {
        if (i >= 9) break;
        const item = tree[i];
        // 如果同级别，只展示自己和自己添加的同级
        if (item.level_id == level) {
          if (this.ctx.token.level == 10) {
            const member = await this.ctx.service.enterprise.market.select({
              market_id,
              level,
            });
            item.member = []
            for (var k=0; k<member.length; k++) {
              const teacher = member[k]
              const parent_userData = await this.ctx.service.enterprise.market.select({
                user_id: teacher.parent_user
              })
              item.member.push({
                ...teacher,
                photo: JSON.parse(teacher.photo)[0] && JSON.parse(teacher.photo)[0].url,
                native_place: getCity(teacher.native_place),
                parent_user_data: parent_userData[0]
              })
            }
            // item.member = member.map(async item => {
            //   const parent_userData = await this.ctx.service.enterprise.market.select({
            //     parent_user: item.parent_user
            //   })
            //   return {
            //     ...item,
            //     photo: JSON.parse(item.photo)[0] && JSON.parse(item.photo)[0].url,
            //     native_place: getCity(item.native_place),
            //     parent_user_data: parent_userData
            //   };
            // });
            parent_user = parent_user.concat(member.map(item =>item))
          } else {
            const member = await this.ctx.service.enterprise.market.select({
              user_id,
            });
            const member2 = await this.ctx.service.enterprise.market.select({
              market_id,
              parent_user: user_id,
              level,
            });
            const tearchers = [ ...member, ...member2 ]
            for (var k=0; k<tearchers.length; k++) {
              const teacher = tearchers[k]
              const parent_userData = await this.ctx.service.enterprise.market.select({
                user_id: teacher.parent_user
              })
              item.member.push({
                ...teacher,
                photo: JSON.parse(teacher.photo)[0] && JSON.parse(teacher.photo)[0].url,
                native_place: getCity(teacher.native_place),
                parent_user_data: parent_userData[0]
              })
            }
            // item.member = [ ...member, ...member2 ].map(item => {
            //   return {
            //     ...item,
            //     photo: JSON.parse(item.photo)[0] && JSON.parse(item.photo)[0].url,
            //     native_place: getCity(item.native_place),
            //   };
            // });
            parent_user = parent_user.concat(tearchers.map(item =>item))
          }
        } else {
          if (parent_user.length < 1) break;

          // 如果是下级
          const member = await this.ctx.service.enterprise.market.select({
            market_id,
            level: item.level_id,
            is_market: '1',
            parent_user: parent_user.map(item => item.user_id),
          });
          item.member = []
          for (var k=0; k<member.length; k++) {
            const teacher = member[k]
            const parent_userData = await this.ctx.service.enterprise.market.select({
              user_id: teacher.parent_user
            })
            item.member.push({
              ...teacher,
              photo: JSON.parse(teacher.photo)[0] && JSON.parse(teacher.photo)[0].url,
              native_place: getCity(teacher.native_place),
              parent_user_data: parent_userData[0]
            })
          }
          // item.member = member.map(item => {
          //   return {
          //     ...item,
          //     photo: JSON.parse(item.photo)[0] && JSON.parse(item.photo)[0].url,
          //     native_place: getCity(item.native_place),
          //     parent_user_data: parent_user[parent_user.length - 1]
          //   };
          // });
          parent_user = parent_user.concat(member.map(item =>item))
        }
      }
    }
    const architectures = await this.ctx.service.enterprise.architectures.select({
      architectures_id: market_id,
    });
    this.ctx.body = {
      code: 1,
      data: {
        architectures: architectures[0],
        tree,
      },
    };
  }

  async create() {
    const user_pwd = this.ctx.helper.sha256('123456');
    let {
      market_id,
      user_id,
    } = this.ctx.token;
    if (this.ctx.request.body.market_id) {
      market_id = this.ctx.request.body.market_id;
    }
    const insertRes = await this.ctx.service.enterprise.employee.insert({
      ...this.ctx.request.body,
      user_name: this.ctx.request.body.mobile,
      market_id,
      user_pwd,
      is_market: '1',
      parent_user: this.ctx.request.body.parent_user || user_id,
    });
    if (insertRes) {
      this.ctx.status = 201;
      this.ctx.body = { msg: '创建成功', code: 1 };
    } else {
      this.ctx.status = 501;
      this.ctx.body = { msg: '创建失败', code: 0 };
    }
  }
}
module.exports = MarketController;
