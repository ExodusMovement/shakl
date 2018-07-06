import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src/s';

s.div = s('div');

it('creates a styled component', () => {
  const Foo = s.div({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});
