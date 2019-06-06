import React from 'react'

import flatten from './flatten'

const styled = (Comp, config = {}) => (style = {}) => {
  const {
    name, // custom displayName for debugging
    multi, // the component has additional style props like `contentContainerStyle` for `FlatList`
    props: factoryProps = {}, // default props the styled component will have
    style: factoryStyle = {}, // default style the styled component will have
    fixedStyle = {}, // styles that are always applied (even if provided somewhere else)
    ...opts
  } = config

  const Styled = React.forwardRef(({ childRef, ...props }, ref) => {
    const { comp, child, childProps = {} } = opts // private values
    const { children } = props

    // .attrs()
    let { attrs } = opts
    attrs = attrs ? attrs(props) : {}

    const styles = {}

    // factory styles
    const factoryStyleProps = multi ? factoryStyle : { style: factoryStyle }
    const factoryStyleKeys = Object.keys(factoryStyleProps)

    for (let i = 0; i < factoryStyleKeys.length; i += 1) {
      const prop = factoryStyleKeys[i]
      styles[prop] = factoryStyleProps[prop]
    }

    // component styles
    const styleProps = multi ? style : { style }
    const styleKeys = Object.keys(styleProps)

    for (let i = 0; i < styleKeys.length; i += 1) {
      const prop = styleKeys[i]
      styles[prop] = {
        ...styles[prop],
        ...flatten([
          attrs[prop],
          typeof styleProps[prop] === 'function' ? styleProps[prop](props) : styleProps[prop],
          props[prop],
        ]),
      }
    }

    // fixed styles
    const fixedStyleProps = multi ? fixedStyle : { style: fixedStyle }
    const fixedStyleKeys = Object.keys(fixedStyleProps)

    for (let i = 0; i < fixedStyleKeys.length; i += 1) {
      const prop = fixedStyleKeys[i]
      styles[prop] = { ...styles[prop], ...fixedStyleProps[prop] }
    }

    const parentProps = {
      ...factoryProps,
      ...attrs,
      ...props,
      ...styles,
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

  Styled.withComponent = (comp) => styled(Styled, { comp })(style)
  Styled.withChild = (child, childProps) => styled(Styled, { child, childProps })()

  return Styled
}

export default styled
