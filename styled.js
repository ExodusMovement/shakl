import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

// TODO:
// support attrs
// support extend
// support extend attrs
// support styled(Styled)

const styled = Component => (...styles) => ({
  children,
  innerRef,
  ...props
}) => {
  const ref = innerRef ? { ref: r => innerRef(r) } : {};

  const style = [
    props.style,
    styles.map(s => (typeof s === 'function' ? s(props) : s))
  ];

  const StyledComponent = React.createElement(
    Component,
    { ...props, ...ref, style },
    children
  );

  const displayName = Component.displayName || Component.name || 'Component';
  StyledComponent.displayName = `Styled${displayName}`;

  return StyledComponent;
};

styled.Text = styled(Text);
styled.TouchableOpacity = styled(TouchableOpacity);
styled.View = styled(View);

export default styled;
