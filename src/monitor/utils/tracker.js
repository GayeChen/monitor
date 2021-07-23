let host = 'cn-beijing.log.aliyuncs.com';
let project = 'wuji-monitor';
let logStore = 'wu-monitor-store';
const userAgent = require('user-agent');

function getExtraData() {
  return {
    title: document.title,
    url: location.url,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name
    // 用户ID
  }
}

class SendTracker {
  constructor() {
    this.url = `http://${project}.${host}/logstores/${logStore}/track`,
    this.xhr = new XMLHttpRequest
  }
  send(data = {}) {
    const extraData = getExtraData();
    let log = {...data, ...extraData};
    // 对象的值不能是数字
    for (let key in log) {
      const value = log[key];
      if (typeof value === 'number') {
        log[key] = `${value}`;
      }
    }
    console.log('log:', log)
    let body = JSON.stringify({
      __logs__: [log]
    });
    this.xhr.open('POST', this.url, true);
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
    this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
    this.xhr.onload = function () {
    }
    this.xhr.onerror = function (error) {
    }
    this.xhr.send(body);
  }
}

export default new SendTracker();