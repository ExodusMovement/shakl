import React from 'react';

import flatten from './flatten';

const styled = (Comp, { name, multi, ...opts } = {}) => style => {
  const Styled = React.forwardRef(({ children, ...props }, ref) => {
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

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  Styled.extend = more => styled(Styled, { name })(more);
  Styled.attrs = attrs => styled(Styled, { name, attrs })();
  Styled.clone = comp => styled(Styled, { name, comp })(style);
  Styled.child = child => styled(Styled, { name, child })();

  return Styled;
};

export default styled;
