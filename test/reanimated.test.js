import React from 'react'

import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated'
import { render } from '@testing-library/react-native';

import s from '../src'

const AnimatedComponent = () => {
  const animatedValue = useSharedValue(0.5)
  const Foo = s(Animated.View)({ flex: 1, opacity: 0 })
  const animatedStyle = useAnimatedStyle(() => ({opacity: animatedValue.value}), [animatedValue])
  return <Foo testID="foo" style={animatedStyle} />
}

it('works with reanimated styles', () => {
  const { getByTestId } = render(<AnimatedComponent />);
  const element = getByTestId('foo');
  expect(element.props.style).toEqual({opacity: 0.5})
  expect(element).toHaveAnimatedStyle({opacity: 0.5})
})
