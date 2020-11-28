/*
 * @Author: tian.gao
 * @Date: 2020-11-24 14:01:18
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 14:14:30
 * @Description:
 */
import request from '@/axios'
// 注册
export function register (data) {
  return request({
    url: '/register',
    data: data
  })
}
// 登录
export function login (data) {
  return request({
    url: '/login',
    data: data
  })
}
// 添加基金
export function createTrusts (data) {
  return request({
    url: '/trusts/create',
    data: data
  })
}
// 删除基金
export function deleteTrusts (data) {
  return request({
    url: '/trusts/delete',
    data: data
  })
}
// 基金列表
export function getTrusts (data) {
  return request({
    url: '/trusts/get',
    data: data
  })
}
