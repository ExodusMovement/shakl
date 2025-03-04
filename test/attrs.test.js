import React from 'react'
import { create as r } from 'react-test-renderer'

import s from '../src/rn'

it('creates a styled component with custom props', () => {
  const Foo = s.Text({ color: 'blue' }).attrs({ numberOfLines: 1 })
  const foo = r(<Foo />).toJSON()

  expect(foo.props.numberOfLines).toBe(1)
  expect(foo.props.style).toEqual({ color: 'blue' })

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with dynamic props', () => {
  const Foo = s.Text({ color: 'red' }).attrs((props) => ({
    numberOfLines: props.oneLiner ? 1 : 3,
  }))

  const foo = r(<Foo />).toJSON()
  const fooOneLiner = r(<Foo oneLiner />).toJSON()

  expect(foo.props.numberOfLines).toBe(3)
  expect(fooOneLiner.props.numberOfLines).toBe(1)

  expect(foo.props.style).toEqual({ color: 'red' })
  expect(fooOneLiner.props.style).toEqual({ color: 'red' })

  expect(foo).toMatchSnapshot()
  expect(fooOneLiner).toMatchSnapshot()
})

it('creates a styled component with children prop', () => {
  const Foo = s.Text().attrs({ children: 'Children1' })
  const foo = r(<Foo />).toJSON()
  expect(foo.children).toEqual(['Children1'])

  const foo2 = r(<Foo>Children2</Foo>).toJSON()
  expect(foo2.children).toEqual(['Children2'])
})