import React from 'react';

import evaluate from './evaluate';
import flatten from './flatten';

const styled = (Comp, { name, ...opts } = {}) => (...styles) => {
  const Styled = React.forwardRef(({ children, ...props }, ref) => {
    const { attrs = {}, comp, child, multiple } = opts;

    return React.createElement(
      comp || Comp,
      {
        ref,
        ...attrs,
        ...props,
        ...(multiple
          ? Object.keys(styles[0]).reduce(
              (obj, prop) => ({
                ...obj,
                [prop]: flatten([
                  attrs[prop],
                  evaluate(styles[0][prop], props),
                  props[prop]
                ])
              }),
              {}
            )
          : {
              style: flatten([
                attrs.style,
                styles.map(style => evaluate(style, props)),
                props.style
              ])
            })
      },
      child ? React.createElement(child, {}, children) : children
    );
  });

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  Styled.extend = (...more) => styled(Styled, { name })(...styles, ...more);
  Styled.attrs = attrs => styled(Styled, { name, attrs })(...styles);
  Styled.withComponent = comp => styled(Styled, { name, comp })(...styles);
  Styled.withChild = child => styled(Styled, { name, child })(...styles);

  return Styled;
};

export default styled;
