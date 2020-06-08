import React from 'react'

import { create as r } from 'react-test-renderer'

import s from '../src'

it('creates a styled component with another styled component', () => {
  const Foo = s.View({ flex: 1 })
  const Bar = Foo.withComponent(s.Text())

  const foo = r(<Foo />).toJSON()
  const bar = r(<Bar />).toJSON()

  expect(foo.type).toBe('View')
  expect(bar.type).toBe('Text')
  expect(foo.props.style).toEqual({ flex: 1 })
  expect(bar.props.style).toEqual({ flex: 1 })

  expect(foo).toMatchSnapshot()
  expect(bar).toMatchSnapshot()
})
