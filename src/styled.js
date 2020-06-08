import React from 'react'

const styled = (Comp, config = {}) => (componentStyle = {}) => {
  const {
    name, // custom displayName for debugging
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

    const style = {
      ...factoryStyle,
      ...attrs.style,
      ...(typeof componentStyle === 'function' ? componentStyle(props) : componentStyle),
      ...props.style,
      ...fixedStyle,
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
