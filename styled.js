import { createElement, forwardRef } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

// TODO:
// support dynamic attrs

const styled = (Component, { withAttrs = {} } = {}) => {
  const StyledComponentFactory = (...styles) => {
    const StyledComponent = forwardRef((props, ref) => {
      const attrs =
        typeof withAttrs === 'function' ? withAttrs(props) : withAttrs;

      const style = [
        props.style,
        attrs.style,
        styles.map(s => (typeof s === 'function' ? s(props) : s))
      ];

      return createElement(Component, {
        ...props,
        ...attrs,
        ref,
        style
      });
    });

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

    StyledComponent.extend = (...extendedStyles) => {
      const ExtendedStyledComponent = StyledComponentFactory(...extendedStyles);

      ExtendedStyledComponent.attrs = props =>
        styled(Component, {
          withAttrs: {
            ...props,
            style: [
              extendedStyles.map(s => (typeof s === 'function' ? s(props) : s)),
              props.style
            ]
          }
        });

      return ExtendedStyledComponent;
    };

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
