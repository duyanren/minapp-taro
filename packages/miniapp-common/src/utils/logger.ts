import Taro from '@tarojs/taro';

const log = Taro?.getRealtimeLogManager ? Taro?.getRealtimeLogManager() : null;

class Logger {
  info(...args) {
    console.info('===========> console.info', args);
    if (!log) return;
    log.info.apply(log, args);
  }
  warn(...args) {
    console.warn('===========> console.warn', args);
    if (!log) return;
    log.warn.apply(log, args);
  }
  debug(...args) {
    console.debug('===========> console.debug', args);
    if (!log) return;
    // @ts-ignore
    log.debug.apply(log, args);
  }
  error(...args) {
    console.error('===========> console.error', args);
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
