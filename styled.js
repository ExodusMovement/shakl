import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

const evaluate = (item, props) =>
  typeof item === 'function' ? item(props) : item;

const styled = (Component /* , { withAttrs = {} } = {} */) => {
  const styledFactory = (...styles) => {
    const Styled = React.forwardRef((props, ref) => {
      // const attrs = evaluate(withAttrs, props);

      const style = [
        props.style,
        // attrs.style,
        styles.map(s => evaluate(s, props))
      ];

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
      style: undefined
    };

    const name = Component.displayName || Component.name || 'Component';
    Styled.displayName = `Styled${name}`;

    Styled.extend = (...moreStyles) => {
      const extendedFactory = styled(Component)(styles, ...moreStyles);

      // extendedFactory.attrs = props => styled(Styled, { withAttrs: props });

      return extendedFactory;
    };

    return Styled;
  };

  // styledFactory.attrs = props => styled(Component, { withAttrs: props });

  return styledFactory;
};

styled.Text = styled(Text);
styled.TouchableOpacity = styled(TouchableOpacity);
styled.View = styled(View);

export default styled;
