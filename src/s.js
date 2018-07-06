import React from 'react';

import flatten from './flatten';

const s = (Comp, opts = {}) => (...args) => {
  const { name, multi, withProps = {}, withComp, withChild } = opts;

  const S = React.forwardRef(({ children, ...props }, ref) => {
    const styles = multi ? args[0] : { style: args };

    return React.createElement(
      withComp || Comp,
      {
        ref,
        ...withProps,
        ...props,
        ...Object.keys(styles).reduce(
          (obj, prop) => ({
            ...obj,
            [prop]: flatten([
              withProps[prop],
              (Array.isArray(styles[prop]) ? styles[prop] : [styles[prop]]).map(
                style => (typeof style === 'function' ? style(props) : style)
              ),
              props[prop]
            ])
          }),
          {}
        )
      },
      withChild ? React.createElement(withChild, {}, children) : children
    );
  });

  S.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  S.extend = (...more) => s(S, { name })(...args, ...more);
  S.withProps = props => s(S, { name, withProps: props })(...args);
  S.withComponent = comp => s(S, { name, withComp: comp })(...args);
  S.withChild = child => s(S, { name, withChild: child })(...args);

  return S;
};

export default s;
