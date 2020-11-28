/*
 * @Author: tian.gao
 * @Date: 2020-11-22 21:06:43
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-28 13:44:49
 * @Description:
 */
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.response.type = 'html';
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../public/index.html'));
  }
}

module.exports = HomeController;
