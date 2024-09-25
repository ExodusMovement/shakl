import type { ComponentType } from "react";
import type {
  ViewStyle,
  ViewProps,
  TextStyle,
  TextProps,
  TouchableOpacityProps,
  ImageStyle,
  ImageProps,
} from "react-native";

export type AnyStyle = ViewStyle | TextStyle | ImageStyle;
export type AnyProps = ViewProps | TextProps | TouchableOpacityProps | ImageProps;

// Make the style functions generic
export type ViewStyleFunction<P = ViewProps> = (props: P) => ViewStyle;
export type TextStyleFunction<P = TextProps> = (props: P) => TextStyle;
export type ImageStyleFunction<P = ImageProps> = (props: P) => ImageStyle;
export type TouchableStyleFunction<P = TouchableOpacityProps> = (props: P) => ViewStyle;
export type AnyStyleFunction<P = any> = (props: P) => AnyStyle;

// Make StyledComponentType generic in P
export type StyledComponentType<P = any> = ComponentType<P> & {
  extend: (more: AnyStyle | AnyStyleFunction<P>) => StyledComponentType<P>;
  attrs: (attrs: Partial<P> | AnyStyleFunction<P>) => StyledComponentType<P>;
  withComponent: (comp: ComponentType<any>) => StyledComponentType<P>;
  withChild: (
    child: ComponentType<any>,
    childProps?: any
  ) => StyledComponentType<P>;
};

// Make the Styled interface generic
export interface Styled {
  <P = any>(
    Component: ComponentType<P>,
    config?: any
  ): (style: AnyStyle | AnyStyleFunction<P>) => StyledComponentType<P>;

  View: <P = ViewProps>(
    style: ViewStyle | ViewStyleFunction<P>
  ) => StyledComponentType<P>;
  Text: <P = TextProps>(
    style: TextStyle | TextStyleFunction<P>
  ) => StyledComponentType<P>;
  Image: <P = ImageProps>(
    style: ImageStyle | ImageStyleFunction<P>
  ) => StyledComponentType<P>;
  Touchable: <P = TouchableOpacityProps>(
    style: ViewStyle | TouchableStyleFunction<P>
  ) => StyledComponentType<P>;
  LinearGradient: <P = ViewProps>(
    style: ViewStyle | ((props: P) => ViewStyle)
  ) => StyledComponentType<P>;
}

declare const styled: Styled;

export default styled;
