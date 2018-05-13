import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

// TODO:
// support extend attrs
// support isStyled
// support style types

const styled = (Component, { withAttrs = {} } = {}) => {
  const StyledComponentFactory = (...styles) => {
    const StyledComponent = ({ innerRef, ...props }) => {
      const attrs =
        typeof withAttrs === 'function' ? withAttrs(props) : withAttrs;

      const ref = innerRef
        ? { ref: typeof innerRef === 'function' ? r => innerRef(r) : innerRef }
        : {};

      const style = [
        props.style,
        attrs.style,
        styles.map(s => (typeof s === 'function' ? s(props) : s))
      ];

      return React.createElement(Component, {
        ...props,
        ...attrs,
        ...ref,
        style
      });
    };

    StyledComponent.propTypes = {
      innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ])
    };

    StyledComponent.defaultProps = {
      innerRef: undefined,
      style: undefined
    };

    const displayName = Component.displayName || Component.name || 'Component';
    StyledComponent.displayName = `Styled${displayName}`;

    StyledComponent.extend = (...extendedStyles) =>
      StyledComponentFactory(extendedStyles);

    return StyledComponent;
  };

  StyledComponentFactory.attrs = props =>
    styled(Component, { withAttrs: props });

  return StyledComponentFactory;
};

styled.Text = styled(Text);
styled.TouchableOpacity = styled(TouchableOpacity);
styled.View = styled(View);

export default styled;
