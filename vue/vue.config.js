/*
 * @Author: tian.gao
 * @Date: 2020-11-24 14:24:02
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 14:53:12
 * @Description:
 */
module.exports = {
  assetsDir: 'assets', // 静态资源目录（js, css, img）
  lintOnSave: false, // 是否开启eslint
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    https: false, // 是否使用https协议
    hotOnly: true, // 是否开启热更新
    proxy: {
      '/': {
        target: 'http://localhost:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/' // rewrite path
        }
      }
    }
  },
  publicPath: '/public'
}
