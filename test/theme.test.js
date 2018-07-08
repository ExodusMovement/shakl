import React from 'react';

import { create as r } from 'react-test-renderer';

import s, { ThemeProvider } from '../src';

it('creates a styled component with theme', () => {
  const style = { padding: 20 };

  const Foo = s
    .Text(({ theme }) => ({
      backgroundColor: theme.backgroundColor,
      color: theme.color,
      ...style
    }))
    .withTheme();

  const lightTheme = { backgroundColor: 'white', color: 'black' };
  const darkTheme = { backgroundColor: 'black', color: 'white' };

  const ThemedFoo = props => (
    <ThemeProvider {...props}>
      <Foo />
    </ThemeProvider>
  );

  const light = r(<ThemedFoo theme={lightTheme} />).toJSON();
  const dark = r(<ThemedFoo theme={darkTheme} />).toJSON();

  expect(light.props.style).toEqual({ ...lightTheme, ...style });
  expect(dark.props.style).toEqual({ ...darkTheme, ...style });

  expect(light).toMatchSnapshot();
  expect(dark).toMatchSnapshot();
});
