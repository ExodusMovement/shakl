import React from 'react'
import type { StyleProp } from 'react-native'

export interface Config<P extends object, A extends object> {
  name?: string
  props?: Partial<P>
  style?: any
  fixedStyle?: any
  attrs?: Attrs<A>
  comp?: React.ComponentType<any>
  child?: React.ComponentType<any>
  childProps?: ((props: any) => any) | any
  omitProps?: Extract<keyof P, string>[]
  [key: string]: any
}

export type StyledProps<S extends object> = {
  childRef?: React.Ref<any>
  style?: StyleProp<S>
}

type WithOptional<T, K extends keyof any> = Omit<T, K> & {
  [P in K]?: P extends keyof T ? T[P] : never
}

type Attrs<A extends object> = ((props: Partial<A>) => Partial<A>) | Partial<A>
type ComponentStyle<P extends object, SP extends object, S extends object> =
  | ((props: Partial<P> & SP) => S)
  | S

const DEFAULT_OMIT_PROPS = ['theme']

export type StyledComponent<P extends object, S extends object> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & StyledProps<S> & { children?: React.ReactNode }> &
    React.RefAttributes<any>
> & {
  extend: <SP extends object>(more: ComponentStyle<P, SP, S>) => StyledComponent<P & SP, S>
  attrs: <A extends P>(attrs: Attrs<A>) => StyledComponent<WithOptional<P, keyof A>, S>
  withComponent: (comp: React.ComponentType<any>) => StyledComponent<P, S>
  withChild: (child: React.ComponentType<any>, childProps?: any) => StyledComponent<P, S>
}

const styled =
  <P extends object, S extends object = object, A extends Partial<P> = {}>( // eslint-disable-line @typescript-eslint/no-empty-object-type
    Comp: React.ComponentType<P>,
    config: Config<P, A> = Object.create(null)
  ) =>
  <SP extends object>(
    componentStyle?: ComponentStyle<P, SP, S>
  ): StyledComponent<WithOptional<P & SP, keyof A>, S> => {
    const {
      name,
      props: factoryProps = Object.create(null),
      style: factoryStyle = Object.create(null),
      fixedStyle = Object.create(null),
      omitProps = DEFAULT_OMIT_PROPS as Extract<keyof P, string>[],
      ...opts
    } = config

    const Styled = React.forwardRef<any, P & StyledProps<S> & { children?: React.ReactNode }>(
      (props, ref) => {
        const { childRef, children, ...restProps } = props
        const { comp, child, childProps = Object.create(null) } = opts

        const attrs = opts.attrs
        const attrsResult = attrs
          ? typeof attrs === 'function'
            ? attrs(restProps as P)
            : attrs
          : Object.create(null)

        let style = {
          ...factoryStyle,
          ...(attrsResult as any).style,
          ...(typeof componentStyle === 'function'
            ? componentStyle(restProps as P & SP)
            : componentStyle),
        }

        let styleFromProps = props.style

        if (Array.isArray(styleFromProps)) {
          styleFromProps = styleFromProps.filter((style) => !!style)
        }

        if (styleFromProps) {
          if (
            typeof styleFromProps === 'number' ||
            (styleFromProps as any).hasOwnProperty('viewDescriptors')
          ) {
            style = [style, styleFromProps, fixedStyle]
          } else if (Array.isArray(styleFromProps)) {
            style = [style, ...styleFromProps, fixedStyle]
          } else {
            style = {
              ...style,
              ...styleFromProps,
              ...fixedStyle,
            }
          }
        }

        omitProps.forEach((excludeProp) => {
          if ((restProps as Record<string, any>)[excludeProp]) {
            delete (restProps as Record<string, any>)[excludeProp]
          }
        })

        const parentProps = {
          ...factoryProps,
          ...attrsResult,
          ...restProps,
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
      }
    )

    Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`

    // Extend the Styled component with custom methods
    const StyledComponent = Object.assign(Styled, {
      extend: <SP2 extends object>(more: ComponentStyle<P, SP & SP2, S>) =>
        styled(StyledComponent, { name })(more),
      attrs: <A2 extends P>(attrs: Attrs<A2>) =>
        styled(StyledComponent, { attrs })() as StyledComponent<WithOptional<P, keyof A2>, S>,
      withComponent: (comp: React.ComponentType<any>) =>
        styled(StyledComponent, { comp })(componentStyle) as StyledComponent<P & SP, S>,
      withChild: (child: React.ComponentType<any>, childProps: any) =>
        styled(StyledComponent, { child, childProps })() as StyledComponent<P & SP, S>,
    })

    return StyledComponent as StyledComponent<WithOptional<P & SP, keyof A>, S>
  }

export default styled
