import React from 'react';

import flatten from './flatten';

const s = (Comp, { name, multi, ...opts } = {}) => (...args) => {
  const S = React.forwardRef(({ children, ...props }, ref) => {
    const { attrs = {}, comp, child } = opts;

    const styleProps = multi ? args[0] : { style: args };

    const styles = Object.keys(styleProps).reduce((obj, prop) => {
      const styleProp = Array.isArray(styleProps[prop])
        ? styleProps[prop]
        : [styleProps[prop]];

      return {
        ...obj,
        [prop]: flatten([
          attrs[prop],
          styleProp.map(
            style => (typeof style === 'function' ? style(props) : style)
          ),
          props[prop]
        ])
      };
    }, {});

    return React.createElement(
      comp || Comp,
      { ref, ...attrs, ...props, ...styles },
      child ? React.createElement(child, {}, children) : children
    );
  });

  S.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  S.extend = (...more) => s(S, { name })(...args, ...more);
  S.withProps = attrs => s(S, { name, attrs })(...args);
  S.withComponent = comp => s(S, { name, comp })(...args);
  S.withChild = child => s(S, { name, child })(...args);

  return S;
};

export default s;
