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

export type StyledComponentType<P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & StyledProps & { children?: React.ReactNode }> &
  React.RefAttributes<any>
> & {
  extend: (more: any) => StyledComponentType<P>;
  attrs: (attrs: any) => StyledComponentType<P>;
  withComponent: (comp: React.ComponentType<any>) => StyledComponentType<P>;
  withChild: (child: React.ComponentType<any>, childProps: any) => StyledComponentType<P>;
};

export interface StyledFunction {
  <P extends object>(
    Comp: React.ComponentType<P>,
    config?: Config<P>
  ): (
    componentStyle?: ((props: P) => any) | any
  ) => StyledComponentType<P>;
}



const styled = <P extends object>(
  Comp: React.ComponentType<P>,
  config: Config<P> = {}
) => (
  componentStyle: ((props: P) => any) | any = {}
): StyledComponentType<P> => {
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
          ? componentStyle(restProps as P)
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
    extend: (more: any) => styled(StyledComponent, { name })(more),
    attrs: (attrs: any) => styled(StyledComponent, { attrs })(),
    withComponent: (comp: React.ComponentType<any>) =>
      styled(StyledComponent, { comp })(componentStyle),
    withChild: (child: React.ComponentType<any>, childProps: any) =>
      styled(StyledComponent, { child, childProps })(),
  });

  return StyledComponent as StyledComponentType<P>;
};

export default styled;
