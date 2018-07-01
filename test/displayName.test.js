import React from 'react';

import { View } from 'react-native';

import { create as r } from 'react-test-renderer';

import s from '../src';

test('has proper display name', () => {
  const Foo = s.Text({ color: 'red' });
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('StyledText');
  expect(foo).toMatchSnapshot();
});

test('allows providing a custom display name', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('Foo');
  expect(foo).toMatchSnapshot();
});

test('falls back to Component.name if Component.displayName cannot be inferred', () => {
  const Foo = () => null;
  const Bar = s(Foo)();
  const foo = r(<Bar />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(Foo.displayName).not.toBeDefined();
  expect(Foo.name).toBe('Foo');
  expect(Bar.displayName).toBe('StyledFoo');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('keeps custom display name when extended', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  const Bar = Foo.extend({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(Foo.displayName).toBe('Foo');
  expect(Bar.displayName).toBe('Foo');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('exposed primitives have proper display names', () => {
  const Foo = s.Text({ color: 'red' });
  const Bar = s.Touchable({ flex: 1 });
  const Baz = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  expect(Foo.displayName).toBe('StyledText');
  expect(Bar.displayName).toBe('StyledTouchable');
  expect(Baz.displayName).toBe('StyledView');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});
