import React from 'react';

import evaluate from './evaluate';
import flatten from './flatten';

const styled = (Comp, { name, ...opts } = {}) => (...styles) => {
  const Styled = React.forwardRef(({ children, ...props }, ref) => {
    const { attrs = {}, comp, child } = opts;

    return React.createElement(
      comp || Comp,
      {
        ref,
        ...attrs,
        ...props,
        ...(Array.isArray(styles[0])
          ? styles[0].reduce(
              (obj, { prop, style }) => ({
                ...obj,
                [prop]: flatten([
                  attrs[prop],
                  evaluate(style, props),
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
