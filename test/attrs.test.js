import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('creates a styled component with custom props', () => {
  const Foo = s.Text({ color: 'blue' }).attrs({ numberOfLines: 1 });
  const foo = r(<Foo />).toJSON();

  expect(foo.props.numberOfLines).toBe(1);
  expect(foo.props.style).toEqual({ color: 'blue' });

  expect(foo).toMatchSnapshot();
});
