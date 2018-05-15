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

    Styled.propTypes = {
      style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ])
    };

    Styled.defaultProps = {
      style: {}
    };

    Styled.displayName =
      displayName || `Styled${Component.displayName || Component.name}`;

    Styled.extend = (...extendedStyles) => {
      const extendedFactory = styled(Component, { displayName })(
        ...styles,
        ...extendedStyles
      );

      // extendedFactory.attrs = props =>
      //   styled(Styled, { displayName }, { withAttrs: props });

      // extendedFactory.child = () => null;

      return extendedFactory;
    };

    return Styled;
  };

  // styledFactory.attrs = props =>
  //   styled(Component, { displayName }, { withAttrs: props });
  // const Btn = styled(Text).attrs({ numberOfLines: 1 })({});

  // styledFactory.child = () => null;
  // const Btn = styled(TouchableOpacity).child(Text)({});

  return styledFactory;
};

styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity, { displayName: 'StyledTouchable' });
styled.View = styled(View, { displayName: 'StyledView' });

export default styled;
