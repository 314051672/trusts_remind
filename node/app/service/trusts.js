/*
 * @Author: tian.gao
 * @Date: 2020-11-23 14:38:37
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-27 09:48:33
 * @Description:
 */
'use strict';
const Service = require('egg').Service;
class TrustsService extends Service {
  // async findOne(id) {
  //   // 假如 我们拿到用户 id 从数据库获取用户详细信息
  //   const user = await this.app.mysql.get('trusts', { id });
  //   return { user };
  // }
  async findAll(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细基金信息
    const trustsList = await this.app.mysql.select('trusts', { where: { uid } });
    return trustsList;
  }
  async findAllforReminders() {
    // 假如 我们拿到用户 id 从数据库获取用户详细基金信息
    const trustsList = await this.app.mysql.select('trusts');
    return trustsList;
  }
  async creatTrusts(trusts) {
    // 创建基金
    const result = await this.app.mysql.insert('trusts', trusts);
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  async deleteTrusts(trusts) {
    // 假如 我们拿到用户 id 从数据库获取用户详细基金信息
    const result = await this.app.mysql.delete('trusts', { uid: trusts.uid, code: trusts.code });
    return result;
  }
}
module.exports = TrustsService;
