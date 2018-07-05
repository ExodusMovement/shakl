import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('accepts a style prop', () => {
  const Foo = s.View({ margin: 10 });
  const foo = r(<Foo style={{ flex: 1 }} />).toJSON();
  expect(foo.props.style).toEqual({ margin: 10, flex: 1 });
  expect(foo).toMatchSnapshot();
});
