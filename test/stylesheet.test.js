import React from 'react'

import { render } from '@testing-library/react-native'

import s from '../src/rn'
import { View, StyleSheet } from 'react-native'

it('works with stylesheet styles', () => {
  const stylesheetStyle = StyleSheet.create({
    foo: {
      marginBottom: 10,
    },
  })
  const StyledComponent = () => {
    const Foo = s(View)({
      flex: 1,
      opacity: 0,
    })
    return <Foo testID="foo" style={stylesheetStyle.foo} />
  }

  const { getByTestId } = render(<StyledComponent />)
  const element = getByTestId('foo')
  expect(element.props.style).toEqual({
    marginBottom: 10,
    flex: 1,
    opacity: 0,
  })
})

it('works with stylesheet styles when use array', () => {
  const stylesheetStyle = StyleSheet.create({
    foo: {
      marginBottom: 10,
    },
  })
  const StyledComponent = () => {
    const Foo = s(View)({
      flex: 1,
      opacity: 0,
    })
    return <Foo testID="foo" style={[stylesheetStyle.foo, { width: 10 }]} />
  }

  const { getByTestId } = render(<StyledComponent />)
  const element = getByTestId('foo')
  expect(element.props.style).toEqual([
    {
      flex: 1,
      opacity: 0,
    },
    { marginBottom: 10 },
    { width: 10 },
    {},
  ])
})
