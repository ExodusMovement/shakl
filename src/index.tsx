// src/index.ts
import React from 'react';

export interface Config<P = any> {
  name?: string;
  props?: Partial<P>;
  style?: any;
  fixedStyle?: any;
  attrs?: (props: P) => any;
  comp?: React.ComponentType<any>;
  child?: React.ComponentType<any>;
  childProps?: ((props: any) => any) | any;
  [key: string]: any;
}

export type StyledProps = {
  childRef?: React.Ref<any>;
  style?: any;
};

type ComponentStyle<P extends object, S extends object> = ((props: Partial<P> & S) => any) | object

export type StyledComponent<P extends object> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & StyledProps & { children?: React.ReactNode }> &
  React.RefAttributes<any>
> & {
  extend: <S extends object>(more: ComponentStyle<P, S>) => StyledComponent<P & S>;
  attrs: (attrs: any) => StyledComponent<P>;
  withComponent: (comp: React.ComponentType<any>) => StyledComponent<P>;
  withChild: (child: React.ComponentType<any>, childProps: any) => StyledComponent<P>;
};

type ComponentFactory<P extends object> = <S extends object>(
  componentStyle: ComponentStyle<P, S>
) => StyledComponent<P & S> | (() => StyledComponent<P>);

export interface StyledFunction {
  <P extends object>(
    Comp: React.ComponentType<P>,
    config?: Config<P>
  ): ComponentFactory<P>;
}

const styled = <P extends object>(
  Comp: React.ComponentType<P>,
  config: Config<P> = {}
) => <S extends object>(componentStyle?: ComponentStyle<P, S>): StyledComponent<P & S> => {
  const {
    name,
    props: factoryProps = {},
    style: factoryStyle = {},
    fixedStyle = {},
    ...opts
  } = config;

  const Styled = React.forwardRef<any, P & StyledProps & { children?: React.ReactNode }>(
    (props, ref) => {
      const { childRef, children, ...restProps } = props;
      const { comp, child, childProps = {} } = opts;

      const attrs = opts.attrs;
      const attrsResult = attrs
        ? typeof attrs === 'function'
          ? attrs(restProps as P)
          : attrs
        : {};

      let style = {
        ...factoryStyle,
        ...attrsResult.style,
        ...(typeof componentStyle === 'function'
          ? componentStyle(restProps as P & S)
          : componentStyle),
      };

      let styleFromProps = props.style;

      if (Array.isArray(styleFromProps)) {
        styleFromProps = styleFromProps.filter((style) => !!style);
      }

      if (styleFromProps) {
        if (
          typeof styleFromProps === 'number' ||
          (styleFromProps as any).hasOwnProperty('viewDescriptors')
        ) {
          style = [style, styleFromProps, fixedStyle];
        } else if (Array.isArray(styleFromProps)) {
          style = [style, ...styleFromProps, fixedStyle];
        } else {
          style = {
            ...style,
            ...styleFromProps,
            ...fixedStyle,
          };
        }
      }

      const parentProps = {
        ...factoryProps,
        ...attrsResult,
        ...restProps,
        style,
      };

      return React.createElement(
        comp || Comp,
        { ref, ...parentProps },
        child
          ? React.createElement(
            child,
            {
              ref: childRef,
              ...(typeof childProps === 'function'
                ? childProps(parentProps)
                : childProps),
            },
            children
          )
          : children
      );
    }
  );

  Styled.displayName = name || `styled(${Comp.displayName || Comp.name})`;

  // Extend the Styled component with custom methods
  const StyledComponent = Object.assign(Styled, {
    extend: <S2 extends object>(more: ComponentStyle<P, S & S2>) => styled(StyledComponent, { name })(more),
    attrs: (attrs: any) => styled(StyledComponent, { attrs })() as StyledComponent<P & S>,
    withComponent: (comp: React.ComponentType<any>) =>
      styled(StyledComponent, { comp })(componentStyle) as StyledComponent<P & S>,
    withChild: (child: React.ComponentType<any>, childProps: any) =>
      styled(StyledComponent, { child, childProps })() as StyledComponent<P & S>,
  });

  return StyledComponent as StyledComponent<P & S>;
};

export default styled;
