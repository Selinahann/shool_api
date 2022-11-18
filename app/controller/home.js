'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async render() {
    const { ctx } = this;
    console.log(path.resolve(__dirname, '../', '/public/dist/index.html'));
    const html = await fs.readFileSync(path.resolve(__dirname, '../', 'public/dist/index.html'), 'utf-8');
    ctx.body = html;
  }
}

module.exports = HomeController;
