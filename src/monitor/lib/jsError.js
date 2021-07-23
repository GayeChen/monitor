import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export function injectJsError() {
  // 监听全局未捕获错误
  window.addEventListener('error', function (event) {
    let lastEvent = getLastEvent(); // 最后一个交互事件
    let log = {
      kind: 'stability', // 监控指标大类
      type: 'error',
      errorType: 'jsError',
      url: '',
      message: event.message, // 报错信息
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : '' // 代表最后一个操作的元素
    }
    tracker.send(log);
  })

  function getLines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
  }
}