import React from 'react'

import { create as r } from 'react-test-renderer'

import s from '../src'

it('passes a single child properly', () => {
  const Foo = s.View({ flex: 1 })

  const foo = r(
    <Foo>
      <Foo />
    </Foo>
  ).toJSON()

  expect(foo.children.length).toBe(1)

  expect(foo).toMatchSnapshot()
})

it('passes multiple children properly', () => {
  const Foo = s.View({})

  const foo = r(
    <Foo>
      <Foo />
      <Foo />
      <Foo />
    </Foo>
  ).toJSON()

  expect(foo.children.length).toBe(3)

  expect(foo).toMatchSnapshot()
})
