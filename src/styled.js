import React from 'react';

import flatten from './flatten';

const styled = (Comp, { name, multi, ...opts } = {}) => style => {
  const Styled = React.forwardRef(({ children, ...props }, ref) => {
    const { attrs = {}, comp, child } = opts;

    const styleProps = multi ? style : { style };
    const styleKeys = Object.keys(styleProps);

    const styles = {};

    for (let i = 0; i < styleKeys.length; i += 1) {
      const prop = styleKeys[i];

      styles[prop] = flatten([
        attrs[prop],
        typeof styleProps[prop] === 'function'
          ? styleProps[prop](props)
          : styleProps[prop],
        props[prop]
      ]);
    }

    return React.createElement(
      comp || Comp,
      {
        ref,
        ...attrs,
        ...props,
        ...styles
      },
      child ? React.createElement(child, {}, children) : children
    );
  });

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  Styled.extend = more => styled(Styled, { name })(more);
  Styled.attrs = attrs => styled(Styled, { name, attrs })();
  Styled.withComponent = comp => styled(Styled, { name, comp })(style);
  Styled.withChild = child => styled(Styled, { name, child })();

  return Styled;
};

export default styled;
