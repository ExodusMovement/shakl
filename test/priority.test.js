import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

test('later styles have higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' }, { backgroundColor: 'green' });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
});

test('style prop should have a higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' });
  const foo = r(<Foo style={{ backgroundColor: 'green' }} />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
});

test('extended styles should have a higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' });
  const Bar = Foo.extend({ backgroundColor: 'green' });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'red' });
  expect(bar.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});
