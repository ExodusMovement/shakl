import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

// TODO:
// support styled(Styled)
// support isStyled
// support prop-types
// support style types
// support extend
// support extend attrs

const styled = (Component, { withAttrs = {} } = {}) => {
  const StyledComponentFactory = (...styles) => {
    const StyledComponent = ({ innerRef, ...props }) => {
      const ref = innerRef
        ? { ref: typeof innerRef === 'function' ? r => innerRef(r) : innerRef }
        : {};

      const style = [
        props.style,
        withAttrs.style,
        styles.map(s => (typeof s === 'function' ? s(props) : s))
      ];

      const createComponent = React.isValidElement(Component)
        ? React.cloneElement
        : React.createElement;

      return createComponent(Component, {
        ...props,
        ...withAttrs,
        ...ref,
        style
      });
    };

    const displayName = Component.displayName || Component.name || 'Component';
    StyledComponent.displayName = `Styled${displayName}`;

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
