import React from 'react';

import evaluate from './evaluate';
import flatten from './flatten';

const s = (Comp, opts = {}) => (...styles) => {
  const { name, withProps = {}, withComp, withChild, multi } = opts;

  const S = React.forwardRef(({ children, ...props }, ref) =>
    React.createElement(
      withComp || Comp,
      {
        ref,
        ...withProps,
        ...props,
        ...(multi
          ? Object.keys(styles[0]).reduce(
              (obj, prop) => ({
                ...obj,
                [prop]: flatten([
                  withProps[prop],
                  evaluate(styles[0][prop], props),
                  props[prop]
                ])
              }),
              {}
            )
          : {
              style: flatten([
                withProps.style,
                styles.map(style => evaluate(style, props)),
                props.style
              ])
            })
      },
      withChild ? React.createElement(withChild, {}, children) : children
    )
  );

  S.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  S.extend = (...more) => s(S, { name })(...styles, ...more);
  S.withProps = props => s(S, { name, withProps: props })(...styles);
  S.withComponent = comp => s(S, { name, withComp: comp })(...styles);
  S.withChild = child => s(S, { name, withChild: child })(...styles);

  return S;
};

export default s;
