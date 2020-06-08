import React from 'react'

import { create as r } from 'react-test-renderer'

import { View } from 'react-native'

import s from '../src'

it('creates a styled component', () => {
  const Foo = s.View({ flex: 1 })
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({ flex: 1 })

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with null static styles', () => {
  const Foo = s.View()
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({})

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with null dynamic styles', () => {
  const Foo = s.View(() => null)
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({})

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with empty static styles', () => {
  const Foo = s.View({})
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({})

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with empty dynamic styles', () => {
  const Foo = s.View(() => ({}))
  const foo = r(<Foo />).toJSON()

  expect(foo.props.style).toEqual({})

  expect(foo).toMatchSnapshot()
})

it('creates a styled component with dynamic styles based on props', () => {
  const Foo = s.View((p) => ({ padding: p.padded ? 10 : 0 }))

  const foo = r(<Foo />).toJSON()
  const fooPadded = r(<Foo padded />).toJSON()

  expect(foo.props.style).toEqual({ padding: 0 })
  expect(fooPadded.props.style).toEqual({ padding: 10 })

  expect(foo).toMatchSnapshot()
  expect(fooPadded).toMatchSnapshot()
})

it('creates a styled component of a functional component', () => {
  const Foo = (props) => <View {...props} />
  const Bar = s(Foo)({ flex: 1 })

  const foo = r(<Foo />).toJSON()
  const bar = r(<Bar />).toJSON()

  expect(bar.props.style).toEqual({ flex: 1 })

  expect(foo).toMatchSnapshot()
  expect(bar).toMatchSnapshot()
})

it('creates a styled component of a class component', () => {
  class Foo extends React.Component {
    render() {
      return <View {...this.props} />
    }
  }

  const Bar = s(Foo)({ flex: 1 })

  const foo = r(<Foo />).toJSON()
  const bar = r(<Bar />).toJSON()

  expect(bar.props.style).toEqual({ flex: 1 })

  expect(foo).toMatchSnapshot()
  expect(bar).toMatchSnapshot()
})
