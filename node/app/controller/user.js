/*
 * @Author: tian.gao
 * @Date: 2020-11-22 21:45:01
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 15:32:06
 * @Description:
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    const user = await service.user.findOne(ctx.request.body.account);
    try {
      if (user.password === ctx.request.body.password) {
        ctx.body = user;
      } else {
        ctx.body = { error: '密码错误' };
      }
    } catch (e) {
      ctx.body = { error: '用户不存在' };
    }
  }
  async createUser() {
    const { ctx, service } = this;
    const res = await service.user.creatUser(ctx.request.body);
    if (res) {
      ctx.body = { state: 'ok' };
    } else {
      ctx.body = { error: '创建用户失败' };
    }
  }
}
module.exports = UserController;
