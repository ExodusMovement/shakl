import React from 'react';

import { create as r } from 'react-test-renderer';

import { Animated } from 'react-native';

import s from '../src';

it('works with animated components', () => {
  const Foo = s(Animated.View)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});
