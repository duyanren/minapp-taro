import { getRealtimeLogManager } from '@tarojs/taro';

const log = getRealtimeLogManager ? getRealtimeLogManager() : null;
console.log('%c [ log ]-4', 'font-size:13px; background:pink; color:#bf2c9f;', log)
class Logger {
  info(...args) {
    if (!log) return;
    log.info.apply(log, args);
  }
  warn(...args) {
    if (!log) return;
    log.warn.apply(log, args);
  }
  error(...args) {
    if (!log) return;
    log.error.apply(log, args);
  }
  setFilterMsg(msg) {
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.setFilterMsg(msg);
  }
  addFilterMsg(msg) {
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.addFilterMsg(msg);
  }
}

export default new Logger();
