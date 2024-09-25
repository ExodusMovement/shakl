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

export type ViewStyleFunction = (props: ViewProps) => ViewStyle;
export type TextStyleFunction = (props: TextProps) => TextStyle;
export type ImageStyleFunction = (props: ImageProps) => ImageStyle;
export type TouchableStyleFunction = (props: TouchableOpacityProps) => ViewStyle;
export type AnyStyleFunction = (props: AnyProps | any) => AnyStyle;

export type StyledComponentType = ComponentType<any> & {
  extend: (more: AnyStyle | AnyStyleFunction) => StyledComponentType;
  attrs: (attrs: any) => StyledComponentType;
  withComponent: (comp: ComponentType<any>) => StyledComponentType;
  withChild: (
    child: ComponentType<any>,
    childProps?: any
  ) => StyledComponentType;
};

export interface Styled {
  (Component: ComponentType<any>, config?: any): (style: AnyStyle | AnyStyleFunction) => StyledComponentType;

  View: (style: ViewStyle | ViewStyleFunction) => StyledComponentType;
  Text: (style: TextStyle | TextStyleFunction) => StyledComponentType;
  Image: (style: ImageStyle | ImageStyleFunction) => StyledComponentType;
  Touchable: (style: ViewStyle | TouchableStyleFunction) => StyledComponentType;
}

declare const styled: Styled;

export default styled;
