import React from 'react';

import flatten from './flatten';

const s = (Comp, { name, multi, ...opts } = {}) => style => {
  const S = React.forwardRef(({ children, ...props }, ref) => {
    const { attrs = {}, comp, child } = opts;

    const styles = multi ? style : { style };

    return React.createElement(
      comp || Comp,
      {
        ref,
        ...attrs,
        ...props,
        ...Object.keys(styles).reduce(
          (obj, prop) => ({
            ...obj,
            [prop]: flatten([
              attrs[prop],
              typeof styles[prop] === 'function'
                ? styles[prop](props)
                : styles[prop],
              props[prop]
            ])
          }),
          {}
        )
      },
      child ? React.createElement(child, {}, children) : children
    );
  });

  S.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  S.extend = more => s(S, { name })(more);
  S.withProps = attrs => s(S, { name, attrs })();
  S.withComponent = comp => s(S, { name, comp })(style);
  S.withChild = child => s(S, { name, child })();

  return S;
};

export default s;
