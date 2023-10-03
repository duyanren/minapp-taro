import { useEffect, useRef, useState } from 'react';

export type CountDownFormat =
  | 'DD'
  | 'D'
  | 'HH'
  | 'H'
  | 'mm'
  | 'm'
  | 'ss'
  | 's'
  | 'SS';

export interface CountDownProps {
  /**
   * 倒计时时长 单位毫秒
   */
  countDownValue?: number;
  /**
   * 正计时时长，单位毫秒
   */
  increaseValue?: number;
  /**
   * 是否是正计时 正计时时countDownValue为0
   * @default false
   */
  isIncrease?: boolean;
  /**
   * 时间格式
   */
  format?: CountDownFormat[];
  /**
   * 是否自动开始计时
   */
  autostart?: boolean;
  /**
   * 计时间隔 单位毫秒
   * @default 1000
   */
  interval?: number;
  /**
   * 计时变化时触发
   * @param currentTime
   * @returns
   */
  onChange?: (currentTime: CurrentTime) => void;
  /**
   * 计时结束时触发
   * @returns
   */
  onComplete?: () => void;
}

export interface CurrentTime {
  /**
   * 剩余总时间（单位毫秒）
   */
  total: number;
  /**
   * 剩余天数
   */
  days: number;
  /**
   * 剩余小时
   */
  hours: number;
  /**
   * 剩余分钟
   */
  minutes: number;
  /**
   * 剩余秒数
   */
  seconds: number;
  /**
   * 剩余毫秒
   */
  milliseconds: number;
}

export interface ReturnCountDown {
  currentTime: number;
  isCounting: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
  formattedTime: string;
}

const defaultFormat: CountDownFormat[] = ['DD', 'HH', 'mm', 'ss'];

const getRemainingTime = (total: number): CurrentTime => {
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((total % 1000) / 10);

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

const formatTime = (time: CurrentTime, format: CountDownFormat[]): string => {
  return format
    .map(f => {
      switch (f) {
        case 'DD':
          return time.days.toString().padStart(2, '0');
        case 'D':
          return time.days.toString().padStart(1, '0');
        case 'HH':
          return time.hours.toString().padStart(2, '0');
        case 'H':
          return time.hours.toString().padStart(1, '0');
        case 'mm':
          return time.minutes.toString().padStart(2, '0');
        case 'm':
          return time.minutes.toString().padStart(1, '0');
        case 'ss':
          return time.seconds.toString().padStart(2, '0');
        case 's':
          return time.seconds.toString().padStart(1, '0');
        case 'SS':
          return time.milliseconds.toString().padStart(2, '0');
        default:
          return '';
      }
    })
    .join(':');
};

const useCountDown = (props: CountDownProps) => {
  const {
    countDownValue = 0,
    increaseValue = 0,
    format = defaultFormat,
    autostart = false,
    isIncrease = false,
    interval = 1000,
    onChange,
    onComplete,
  } = props;

  const [currentTime, setCurrentTime] = useState<CurrentTime>(
    getRemainingTime(isIncrease ? 0 : countDownValue),
  );
  const [isCounting, setIsCounting] = useState<boolean>(autostart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentTime(
      isIncrease ? getRemainingTime(0) : getRemainingTime(countDownValue),
    );
  }, [countDownValue, isIncrease]);

  useEffect(() => {
    if (isCounting) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const total = isIncrease
            ? prevTime.total + interval
            : prevTime.total - interval;

          // 正计时
          if (isIncrease) {
            if (total >= increaseValue) {
              clearInterval(timerRef.current as NodeJS.Timeout);
              setIsCounting(false);
              setCurrentTime(getRemainingTime(increaseValue));
              if (onComplete) onComplete();
              return getRemainingTime(increaseValue);
            }
          } else {
            // 倒计时
            if (total <= 0) {
              clearInterval(timerRef.current as NodeJS.Timeout);
              setIsCounting(false);
              setCurrentTime(getRemainingTime(0));
              if (onComplete) onComplete();
              return getRemainingTime(0);
            }
          }

          const newTime = getRemainingTime(total);

          if (onChange) onChange(newTime);

          return newTime;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isIncrease,
    isCounting,
    countDownValue,
    increaseValue,
    interval,
    onComplete,
    onChange,
  ]);

  const start = () => {
    setIsCounting(true);
  };

  const pause = () => {
    setIsCounting(false);
  };

  const reset = () => {
    setIsCounting(false);
    setCurrentTime(getRemainingTime(isIncrease ? 0 : countDownValue));
  };

  const restart = () => {
    setIsCounting(true);
    setCurrentTime(getRemainingTime(isIncrease ? 0 : countDownValue));
  };

  return {
    currentTime,
    isCounting,
    start,
    pause,
    reset,
    restart,
    formattedTime: formatTime(currentTime, format),
  };
};

export default useCountDown;
