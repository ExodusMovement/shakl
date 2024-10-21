import React from 'react'

import { create as r } from 'react-test-renderer'

import { Text, TouchableOpacity, View } from 'react-native'

import s from '../src/rn'

it('exposes primitives', () => {
  expect(s.Text).toBeDefined()
  expect(s.Touchable).toBeDefined()
  expect(s.View).toBeDefined()
})

test('exposed primitives are valid', () => {
  const Foo = s(Text)()
  const Bar = s(TouchableOpacity, { displayName: 'StyledTouchable' })()
  const Baz = s(View, { displayName: 'StyledView' })()

  const FooPrimitive = s.Text()
  const BarPrimitive = s.Touchable()
  const BazPrimitive = s.View()

  const foo = r(<Foo />).toJSON()
  const bar = r(<Bar />).toJSON()
  const baz = r(<Baz />).toJSON()

  const fooPrimitive = r(<FooPrimitive />).toJSON()
  const barPrimitive = r(<BarPrimitive />).toJSON()
  const bazPrimitive = r(<BazPrimitive />).toJSON()

  expect(JSON.stringify(foo)).toEqual(JSON.stringify(fooPrimitive))
  expect(JSON.stringify(bar)).toEqual(JSON.stringify(barPrimitive))
  expect(JSON.stringify(baz)).toEqual(JSON.stringify(bazPrimitive))

  expect(foo).toMatchSnapshot()
  expect(bar).toMatchSnapshot()
  expect(baz).toMatchSnapshot()
  expect(fooPrimitive).toMatchSnapshot()
  expect(barPrimitive).toMatchSnapshot()
  expect(bazPrimitive).toMatchSnapshot()
})
