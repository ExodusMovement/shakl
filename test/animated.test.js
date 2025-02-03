import React from 'react'
import { Animated } from 'react-native'
import { create as r } from 'react-test-renderer'

import s from '../src/rn'

it('works with animated components', () => {
  const Foo = s(Animated.View)({ flex: 1 })
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({ flex: 1 })

  expect(foo).toMatchSnapshot()
})
