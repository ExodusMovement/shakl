import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../';

test('allows providing propTypes', () => {
  const Foo = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(Foo.propTypes).toBeDefined();
  expect(foo).toMatchSnapshot();
});

test('allows providing defaultProps', () => {
  const Foo = s.View({ flex: 1 });
  Foo.defaultProps = { bar: 'baz' };
  const foo = r(<Foo />).toJSON();
  expect(foo.props.bar).toBe('baz');
  expect(foo).toMatchSnapshot();
});
