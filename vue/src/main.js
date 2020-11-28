/*
 * @Author: tian.gao
 * @Date: 2020-11-24 10:36:10
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 11:06:19
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
