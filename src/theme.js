import React from 'react';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ theme, ...props }) => (
  <ThemeContext.Provider {...props} value={theme} />
);

export const withTheme = Comp =>
  React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {theme => <Comp {...{ ref, theme }} {...props} />}
    </ThemeContext.Consumer>
  ));
