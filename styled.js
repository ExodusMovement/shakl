import { createElement } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

// TODO:
// support innerRef
// support attrs
// support extend
// support extend attrs
// support styled(Styled)

// Component.displayName = Component.displayName || Component.name || 'Component';

const styled = Component => (...styles) => ({ children, ...props }) =>
  createElement(
    Component,
    {
      ...props,
      style: [
        props.style,
        styles.map(
          style => (typeof style === 'function' ? style(props) : style)
        )
      ]
    },
    children
  );

styled.Text = styled(Text);
styled.TouchableOpacity = styled(TouchableOpacity);
styled.View = styled(View);

export default styled;
