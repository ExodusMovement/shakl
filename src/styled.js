import React from 'react';

import flatten from './flatten';

import { ThemeProvider, withTheme } from './theme';

const styled = (Comp, { name, multi, ...opts } = {}) => style => {
  const Styled = React.forwardRef(({ childRef, ...props }, ref) => {
    const { attrs, comp, child, childProps } = opts;
    const { children } = props;

    const styleProps = multi ? style : { style };
    const styleKeys = Object.keys(styleProps);

    const styles = {};

    for (let i = 0; i < styleKeys.length; i += 1) {
      const prop = styleKeys[i];

      styles[prop] = flatten([
        typeof styleProps[prop] === 'function'
          ? styleProps[prop](props)
          : styleProps[prop],
        props[prop]
      ]);
    }

    const parentProps = {
      ...(attrs && attrs(props)),
      ...props,
      ...styles
    };

    return React.createElement(
      comp || Comp,
      { ref, ...parentProps },
      child
        ? React.createElement(
            child,
            {
              ref: childRef,
              ...(typeof childProps === 'function'
                ? childProps(parentProps)
                : childProps)
            },
            children
          )
        : children
    );
  });

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  Styled.extend = more => styled(Styled, { name })(more);

  Styled.attrs = attrs => {
    if (typeof attrs === 'function') return styled(Styled, { name, attrs })();

    Styled.defaultProps = {
      ...Styled.defaultProps,
      ...attrs
    };

    return Styled;
  };

  Styled.withComponent = comp => styled(Styled, { comp })(style);

  Styled.withChild = (child, childProps) =>
    styled(Styled, { child, childProps })();

  Styled.withTheme = () => withTheme(Styled);

  return Styled;
};

export { styled as default, ThemeProvider, withTheme };
