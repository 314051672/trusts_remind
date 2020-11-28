/*
 * @Author: tian.gao
 * @Date: 2020-11-24 10:36:10
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-24 11:09:32
 * @Description:
 */
// // 这是项目发布阶段需要用到的 babel 插件
// const prodPlugins = []
// if (process.env.NODE_ENV === 'production') {
//   prodPlugins.push('transform-remove-console')
// }

module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
