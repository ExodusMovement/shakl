import React from 'react'

const styled = (Comp, config = Object.create(null)) => (componentStyle = Object.create(null)) => {
  const {
    name, // custom displayName for debugging
    props: factoryProps = Object.create(null), // default props the styled component will have
    style: factoryStyle = Object.create(null), // default style the styled component will have
    fixedStyle = Object.create(null), // styles that are always applied (even if provided somewhere else)
    ...opts
  } = config

  const Styled = React.forwardRef(({ childRef, ...props }, ref) => {
    const { comp, child, childProps = Object.create(null) } = opts // private values
    const { children } = props

    // .attrs()
    let { attrs } = opts
    attrs = attrs ? attrs(props) : Object.create(null)

    let style = {
      ...factoryStyle,
      ...attrs.style,
      ...(typeof componentStyle === 'function' ? componentStyle(props) : componentStyle),
    }
    
    let styleFromProps = props.style
    
    if (Array.isArray(styleFromProps)) {
      styleFromProps = styleFromProps.filter(style => !!style)
    }
    
    if (styleFromProps) {
      // assuming this is react-native-reanimated >v2 style comming from useAnimatedStyle or React-Native StyleSheet style
      if (typeof styleFromProps === 'number' || styleFromProps.hasOwnProperty('viewDescriptors')) {
        style = [style, styleFromProps, fixedStyle]
      } else if (Array.isArray(styleFromProps)) {
        style = [style, ...styleFromProps, fixedStyle]
      } else {
        style = {
          ...style,
          ...styleFromProps,
          ...fixedStyle
        }
      }
    }

    const parentProps = {
      ...factoryProps,
      ...attrs,
      ...props,
      style,
    }

    return React.createElement(
      comp || Comp,
      { ref, ...parentProps },
      child
        ? React.createElement(
            child,
            {
              ref: childRef,
              ...(typeof childProps === 'function' ? childProps(parentProps) : childProps),
            },
            children
          )
        : children
    )
  })

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`

  Styled.extend = (more) => styled(Styled, { name })(more)

  Styled.attrs = (attrs) => {
    if (typeof attrs === 'function') return styled(Styled, { attrs })()

    Styled.defaultProps = {
      ...Styled.defaultProps,
      ...attrs,
    }

    return Styled
  }

  Styled.withComponent = (comp) => styled(Styled, { comp })(componentStyle)
  Styled.withChild = (child, childProps) => styled(Styled, { child, childProps })()

  return Styled
}

export default styled
