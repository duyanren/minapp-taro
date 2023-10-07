import { useDidShow } from '@tarojs/taro';

import { View } from '@tarojs/components';
import { CountDown } from '@duyanren/miniapp-ui';
import { useCountDown } from '@duyanren/miniapp-common';

import './index.scss';

export default function Index() {
  const { currentTime } = useCountDown({
    countDownValue: 600000,
    autostart: true,
  });

  useDidShow(() => {
    // logger.error(`===========>useDidShow`);
  });

  return (
    <View>
      seconds: {currentTime?.seconds}
      <CountDown />
    </View>
  );
}
