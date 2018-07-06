import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('creates a styled component with static multiple style props', () => {
  const Foo = s.View([
    { prop: 'style', style: { flex: 1 } },
    { prop: 'contentContainerStyle', style: { flex: 2 } },
    { prop: 'anotherStyleProp', style: { flex: 3 } }
  ]);
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo.props.contentContainerStyle).toEqual({ flex: 2 });
  expect(foo.props.anotherStyleProp).toEqual({ flex: 3 });
  expect(foo).toMatchSnapshot();
});

it('creates a styled component with dynamic multiple style props', () => {
  const Foo = s.View([
    {
      prop: 'style',
      style: ({ padded }) => ({ padding: padded ? 10 : 0 })
    },
    {
      prop: 'contentContainerStyle',
      style: ({ padded }) => ({ padding: padded ? 20 : 0 })
    },
    {
      prop: 'anotherStyleProp',
      style: ({ padded }) => ({ padding: padded ? 30 : 0 })
    }
  ]);
  const foo = r(<Foo />).toJSON();
  const fooPadded = r(<Foo padded />).toJSON();
  expect(foo.props.style).toEqual({ padding: 0 });
  expect(foo.props.contentContainerStyle).toEqual({ padding: 0 });
  expect(foo.props.anotherStyleProp).toEqual({ padding: 0 });
  expect(fooPadded.props.style).toEqual({ padding: 10 });
  expect(fooPadded.props.contentContainerStyle).toEqual({ padding: 20 });
  expect(fooPadded.props.anotherStyleProp).toEqual({ padding: 30 });
  expect(foo).toMatchSnapshot();
  expect(fooPadded).toMatchSnapshot();
});
