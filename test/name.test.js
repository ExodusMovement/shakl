import React from 'react';

import { create as r } from 'react-test-renderer';

import { View } from 'react-native';

import s from '../src';

it('has proper display name', () => {
  const Foo = s.Text({ color: 'red' });
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('styled(Text)');
  expect(foo).toMatchSnapshot();
});

it('allows providing a custom display name', () => {
  const Foo = s(View, { name: 'Foo' })({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('Foo');
  expect(foo).toMatchSnapshot();
});

it('falls back to Component.name if Component.displayName cannot be inferred', () => {
  const Foo = () => null;
  const Bar = s(Foo)();
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(Foo.displayName).not.toBeDefined();
  expect(Foo.name).toBe('Foo');
  expect(Bar.displayName).toBe('styled(Foo)');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

it('keeps custom display name when extended', () => {
  const Foo = s(View, { name: 'Foo' })({ flex: 1 });
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
  expect(Foo.displayName).toBe('styled(Text)');
  expect(Bar.displayName).toBe('styled(Touchable)');
  expect(Baz.displayName).toBe('styled(View)');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});
