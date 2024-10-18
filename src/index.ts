import React from 'react';
import type {StyleProp} from "react-native";

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

export type StyledProps<S extends object> = {
  childRef?: React.Ref<any>;
  style?: StyleProp<S>;
};

type ComponentStyle<P extends object, SP extends object, S extends object> = ((props: Partial<P> & SP) => S) | S

export type StyledComponent<P extends object, S extends object> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & StyledProps<S> & { children?: React.ReactNode }> &
  React.RefAttributes<any>
> & {
  extend: <SP extends object>(more: ComponentStyle<P, SP, S>) => StyledComponent<P & SP, S>;
  attrs: (attrs: any) => StyledComponent<P, S>;
  withComponent: (comp: React.ComponentType<any>) => StyledComponent<P, S>;
  withChild: (child: React.ComponentType<any>, childProps: any) => StyledComponent<P, S>;
};

type ComponentFactory<P extends object, S extends object> = <SP extends object>(
  componentStyle: ComponentStyle<P, SP, S>
) => StyledComponent<P & SP, S> | (() => StyledComponent<P, S>);

export interface StyledFunction{
  <P extends object, S extends object>(
    Comp: React.ComponentType<P>,
    config?: Config<P>
  ): ComponentFactory<P, S>;
}

const styled = <P extends object, S extends object = object>(
  Comp: React.ComponentType<P>,
  config: Config<P> = {}
) => <SP extends object>(componentStyle?: ComponentStyle<P, SP, S>): StyledComponent<P & SP, S> => {
  const {
    name,
    props: factoryProps = {},
    style: factoryStyle = {},
    fixedStyle = {},
    ...opts
  } = config;

  const Styled = React.forwardRef<any, P & StyledProps<S> & { children?: React.ReactNode }>(
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
          ? componentStyle(restProps as P & SP)
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
    extend: <SP2 extends object>(more: ComponentStyle<P, SP & SP2, S>) => styled(StyledComponent, { name })(more),
    attrs: (attrs: any) => styled(StyledComponent, { attrs })() as StyledComponent<P & SP, S>,
    withComponent: (comp: React.ComponentType<any>) =>
      styled(StyledComponent, { comp })(componentStyle) as StyledComponent<P & SP, S>,
    withChild: (child: React.ComponentType<any>, childProps: any) =>
      styled(StyledComponent, { child, childProps })() as StyledComponent<P & SP, S>,
  });

  return StyledComponent as StyledComponent<P & SP, S>;
};

export default styled;
