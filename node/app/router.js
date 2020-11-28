/*
 * @Author: tian.gao
 * @Date: 2020-11-22 21:06:43
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 09:29:17
 * @Description:
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.createUser);
  router.post('/trusts/get', controller.trusts.getTrusts);
  router.post('/trusts/create', controller.trusts.createTrusts);
  router.post('/trusts/delete', controller.trusts.deleteTrusts);
};
