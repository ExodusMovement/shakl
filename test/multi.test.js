import React from 'react';

import { create as r } from 'react-test-renderer';

import { FlatList } from 'react-native';

import s from '../src';

it('creates a styled component with static multi style props', () => {
  const Foo = s(FlatList, { multi: true })({
    style: { flex: 1 },
    contentContainerStyle: { flex: 2 },
    anotherStyleProp: { flex: 3 }
  });

  const foo = r(<Foo />).toJSON();

  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo.props.contentContainerStyle).toEqual({ flex: 2 });
  expect(foo.props.anotherStyleProp).toEqual({ flex: 3 });

  expect(foo).toMatchSnapshot();
});

it('creates a styled component with dynamic multi style props', () => {
  const Foo = s(FlatList, { multi: true })({
    style: ({ padded }) => ({ padding: padded ? 10 : 0 }),
    contentContainerStyle: ({ padded }) => ({ padding: padded ? 20 : 0 }),
    anotherStyleProp: ({ padded }) => ({ padding: padded ? 30 : 0 })
  });

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
