/*
 * @Author: tian.gao
 * @Date: 2020-11-23 15:45:49
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-25 09:49:56
 * @Description:
 */
'use strict';

const Controller = require('egg').Controller;

class TrustsController extends Controller {
  async getTrusts() {
    const { ctx, service } = this;
    const res = await service.trusts.findAll(ctx.request.body.uid);
    ctx.body = res;
  }
  async createTrusts() {
    const { ctx, service } = this;
    console.log(ctx.request.body);
    const res = await service.trusts.creatTrusts(ctx.request.body);
    if (res) {
      ctx.body = { state: 'ok' };
    } else {
      ctx.body = { error: '创建失败' };
    }
  }
  async deleteTrusts() {
    const { ctx, service } = this;
    const res = await service.trusts.deleteTrusts(ctx.request.body);
    if (res) {
      ctx.body = { state: 'ok' };
    } else {
      ctx.body = { error: '删除失败' };
    }
  }
}
module.exports = TrustsController;
