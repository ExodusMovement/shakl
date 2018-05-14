import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

const evaluate = (item, props) => {
  if (typeof item === 'function') return item(props);
  return item;
};

const styled = (Component, { displayName /* withAttrs = {} */ } = {}) => {
  const styledFactory = (...styles) => {
    const Styled = React.forwardRef((props, ref) => {
      // const attrs = evaluate(withAttrs, props);

      const style = StyleSheet.flatten([
        props.style,
        // attrs.style,
        styles.map(s => evaluate(s, props))
      ]);

      return React.createElement(Component, {
        ...props,
        // ...attrs,
        ref,
        style
      });
    });

    Styled.propTypes = {
      style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ])
    };

    Styled.defaultProps = {
      style: {}
    };

    const name = Component.displayName || Component.name || 'Component';
    Styled.displayName = displayName || `Styled${name}`;

    Styled.extend = (...extendedStyles) => {
      const extendedFactory = styled(Component, { displayName })(
        ...styles,
        ...extendedStyles
      );

      // extendedFactory.attrs = props =>
      //   styled(Styled, { displayName }, { withAttrs: props });

      return extendedFactory;
    };

    return Styled;
  };

  // styledFactory.attrs = props =>
  //   styled(Component, { displayName }, { withAttrs: props });

  return styledFactory;
};

styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity, { displayName: 'StyledTouchable' });
styled.View = styled(View, { displayName: 'StyledView' });

export default styled;
