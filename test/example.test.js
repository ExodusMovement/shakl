import React from 'react';

import { create as r } from 'react-test-renderer';

import Example from './Example';

it('works', () => {
  const app = r(<Example />).toJSON();

  expect(app).toMatchSnapshot();
});
