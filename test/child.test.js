import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('creates a styled component with a child', () => {
  const ButtonText = s.Text({ color: 'blue' });
  const ButtonContainer = s.Touchable({ flex: 1 });
  const Button = ButtonContainer.child(ButtonText);
  const button = r(<Button>Press me</Button>).toJSON();
  expect(button.type).toBe('View');
  expect(button.children[0].type).toBe('Text');
  expect(button.children[0].children[0]).toBe('Press me');
  expect(button.props.style).toEqual({ flex: 1, opacity: 1 });
  expect(button.children[0].props.style).toEqual({ color: 'blue' });
  expect(button).toMatchSnapshot();
});
