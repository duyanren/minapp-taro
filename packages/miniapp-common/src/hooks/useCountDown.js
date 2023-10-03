"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const defaultFormat = ['DD', 'HH', 'mm', 'ss'];
const getRemainingTime = (total) => {
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
const formatTime = (time, format) => {
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
const useCountDown = (props) => {
    const { countDownValue = 0, increaseValue = 0, format = defaultFormat, autostart = false, isIncrease = false, interval = 1000, onChange, onComplete, } = props;
    const [currentTime, setCurrentTime] = (0, react_1.useState)(getRemainingTime(isIncrease ? 0 : countDownValue));
    const [isCounting, setIsCounting] = (0, react_1.useState)(autostart);
    const timerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setCurrentTime(isIncrease ? getRemainingTime(0) : getRemainingTime(countDownValue));
    }, [countDownValue, isIncrease]);
    (0, react_1.useEffect)(() => {
        if (isCounting) {
            timerRef.current = setInterval(() => {
                setCurrentTime(prevTime => {
                    const total = isIncrease
                        ? prevTime.total + interval
                        : prevTime.total - interval;
                    // 正计时
                    if (isIncrease) {
                        if (total >= increaseValue) {
                            clearInterval(timerRef.current);
                            setIsCounting(false);
                            setCurrentTime(getRemainingTime(increaseValue));
                            if (onComplete)
                                onComplete();
                            return getRemainingTime(increaseValue);
                        }
                    }
                    else {
                        // 倒计时
                        if (total <= 0) {
                            clearInterval(timerRef.current);
                            setIsCounting(false);
                            setCurrentTime(getRemainingTime(0));
                            if (onComplete)
                                onComplete();
                            return getRemainingTime(0);
                        }
                    }
                    const newTime = getRemainingTime(total);
                    if (onChange)
                        onChange(newTime);
                    return newTime;
                });
            }, interval);
        }
        else {
            if (timerRef.current)
                clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current)
                clearInterval(timerRef.current);
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
exports.default = useCountDown;
//# sourceMappingURL=useCountDown.js.map