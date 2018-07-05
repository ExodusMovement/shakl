import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import flatten from './flatten';

const evaluate = (item, props) => {
  if (typeof item === 'function') return item(props);
  return item;
};

const styled = (Component, { displayName /* withAttrs = {} */ } = {}) => {
  const styledFactory = (...styles) => {
    const Styled = React.forwardRef((props, ref) => {
      // const attrs = evaluate(withAttrs, props);

      const style = flatten([
        styles.map(s => evaluate(s, props)),
        // attrs.style,
        props.style
      ]);

      return React.createElement(Component, {
        ...props,
        ref,
        // ...attrs,
        style
      });
    });

    Styled.defaultProps = { style: {} };

    Styled.displayName =
      displayName || `styled(${Component.displayName || Component.name})`;

    Styled.extend = (...extendedStyles) => {
      const extendedFactory = styled(Component, { displayName })(
        ...styles,
        ...extendedStyles
      );

      // extendedFactory.attrs = props => styled(Styled, { displayName }, { withAttrs: props });
      // extendedFactory.withChild = () => {};

      return extendedFactory;
    };

    return Styled;
  };

  // styledFactory.attrs = props => styled(Component, { displayName }, { withAttrs: props });
  // styledFactory.withChild = () => {};

  return styledFactory;
};

styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity, {
  displayName: 'styled(Touchable)'
});
styled.View = styled(View, { displayName: 'styled(View)' });

export default styled;
