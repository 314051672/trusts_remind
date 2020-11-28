/*
 * @Author: tian.gao
 * @Date: 2020-11-22 21:06:43
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-28 13:49:40
 * @Description:
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  static: {
    enable: true,
  },
};
