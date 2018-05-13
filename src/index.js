import React from 'react';

import { StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const evaluate = (item, props) => {
  if (typeof item === 'function') return item(props);
  return item;
};

const styled = (Component, { displayName /* withAttrs = {}  */ } = {}) => {
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
      style: undefined
    };

    const name = Component.displayName || Component.name || 'Component';
    Styled.displayName = displayName || `Styled${name}`;

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

export default styled;
