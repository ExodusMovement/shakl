import React from 'react'
import { View } from 'react-native'
import { create as r } from 'react-test-renderer'

import s from '../src/rn'

it('accepts a style prop', () => {
  const Foo = s.View({ margin: 10 })
  const foo = r(<Foo style={{ flex: 1 }} />).toJSON()

  expect(foo.props.style).toEqual({ margin: 10, flex: 1 })

  expect(foo).toMatchSnapshot()
})

const theme = {
  fancyColor: '#193bc3',
}

it("doesn't pass `theme` property by default", () => {
  const Foo = s.View(({ theme }) => ({ color: theme.fancyColor }))
  const foo = r(<Foo theme={theme} />).toJSON()

  expect(foo.props.style).toEqual({
    color: '#193bc3',
  })

  expect(foo).toMatchSnapshot()
})

it('passes `theme` property if `omitProps` specified without it', () => {
  const Foo = s(View, { omitProps: [] })(({ theme }) => ({ color: theme.fancyColor }))
  const foo = r(<Foo theme={theme} />).toJSON()

  expect(foo.props.style).toEqual({
    color: '#193bc3',
  })

  expect(foo).toMatchSnapshot()
})
