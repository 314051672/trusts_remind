/*
 * @Author: tian.gao
 * @Date: 2020-11-24 13:58:34
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 14:54:21
 * @Description:
 */
import axios from 'axios'
// 创建axios实例
const http = axios.create({
  baseURL: '', // api的base_url
  /* baseURL: "proxy", */
  // `method` 是创建请求时使用的方法
  method: 'post', // 默认是 post
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export default function (config) {
  return http(config)
}
