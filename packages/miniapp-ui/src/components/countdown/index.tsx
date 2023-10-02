import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
// import style from '../../style/countdown.scss';

interface IProps {
  startTime: number;
  endTime: number;
  onTimeup?(): void;
  text: string;
}

export default function CountDown(props: IProps) {
  const [count, setCount] = useState(0);
  useDidShow(() => {
    Taro.showLoading();
  });
  useEffect(() => {
    setTimeout(() => {
      setCount(2);
    }, 5000);
  }, []);

  return (
    <View className='a' onClick={props.onTimeup}>
      <Text>{props.text}</Text>
      <Text>count: {count}</Text>
    </View>
  );
}
