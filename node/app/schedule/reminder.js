/*
 * @Author: tian.gao
 * @Date: 2020-11-27 08:58:27
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-28 13:21:37
 * @Description:
 */
'use strict';
const Subscription = require('egg').Subscription;
const Mymailer = require('../utils/mail');

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 40 14 * * MON-FRI', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const that = this;
    let trusts = await this.service.trusts.findAllforReminders();
    const codeMap = new Map();
    for (let i = 0; i < trusts.length; i++) {
      codeMap.set(trusts[i].code, 0);
    }
    const promis = [];
    codeMap.forEach(async (value, key) => {
      promis.push(that.ctx.curl('http://fundgz.1234567.com.cn/js/' + key + '.js', { dataType: 'text' }).then(res => {
        try {
          const json = JSON.parse(res.data.substring(8, res.data.length - 2));
          codeMap.set(key, json);
        } catch (error) {
          codeMap.delete(key);
        }
      }));
    });
    Promise.all(promis).then(() => {
      trusts = trusts.filter(e => {
        try {

          const gszzl = codeMap.get(e.code).gszzl;
          return gszzl > e.upperLimit || gszzl < -e.downLimit;
        } catch (error) {
          return false;
        }
      });
      // 用于发送的map数据
      const fundToMail = new Map();
      trusts.forEach(e => {
        try {
          if (fundToMail.get(e.mail) !== undefined) {
            fundToMail.get(e.mail).push({ code: e.code, ...codeMap.get(e.code) });
          } else {
            fundToMail.set(e.mail, [{ code: e.code, ...codeMap.get(e.code) }]);
          }
        } catch (error) {
          console.log(error);
        }
      });
      const mailOptions = {
        from: '"夜星" <314051672@qq.com>', // sender address
        to: '', // list of receivers
        subject: 'Hello', // Subject line
        // 发送text或者html格式
        // text: 'Hello 我是火星黑洞', // plain text body
        html: '<b>Hello 未获取到参数</b>', // html body
      };
      console.log(fundToMail);
      fundToMail.forEach(async (value, key) => {
        let html = `
            <table border="1">
        <tr>
          <th>代码</th>
          <th>名称</th>
          <th>当前时间</th>
          <th>当前涨跌幅</th>
        </tr>`;
        for (let i = 0; i < value.length; i++) {
          const e = value[i];
          html = html + `<tr>
          <th>${e.code}</th>
          <th>${e.name}</th>
          <th>${e.gztime}</th>
          <th>${e.gszzl}</th>
        </tr>`;
        }
        html = html + '</table>';
        mailOptions.to = key;
        mailOptions.html = html;
        Mymailer.sendMail(mailOptions);
        console.log('ok');
      });
    });

    this.ctx.app.cache = codeMap;
  }
}

module.exports = UpdateCache;

