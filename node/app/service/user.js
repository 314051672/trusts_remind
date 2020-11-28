/*
 * @Author: tian.gao
 * @Date: 2020-11-22 21:25:38
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-23 15:46:58
 * @Description:
 */
'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async findOne(account) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', { account });
    return user;
  }
  async findAll() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const userList = await this.app.mysql.select('users');
    return userList;
  }
  async creatUser(user) {
    // 创建用户
    user.uid = new Date();
    const result = await this.app.mysql.insert('users', user);
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
}

module.exports = UserService;
