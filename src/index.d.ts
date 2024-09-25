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

type AnyStyle = ViewStyle | TextStyle | ImageStyle;
type AnyProps = ViewProps | TextProps | TouchableOpacityProps | ImageProps;

type ViewStyleFunction = (props: ViewProps) => ViewStyle;
type TextStyleFunction = (props: TextProps) => TextStyle;
type ImageStyleFunction = (props: ImageProps) => ImageStyle;
type TouchableStyleFunction = (props: TouchableOpacityProps) => ViewStyle;
type AnyStyleFunction = (props: AnyProps | any) => AnyStyle;

type StyledComponentType = ComponentType<any> & {
  extend: (more: AnyStyle | AnyStyleFunction) => StyledComponentType;
  attrs: (attrs: any) => StyledComponentType;
  withComponent: (comp: ComponentType<any>) => StyledComponentType;
  withChild: (
    child: ComponentType<any>,
    childProps?: any
  ) => StyledComponentType;
};

interface Styled {
  (Component: ComponentType<any>, config?: any): (style: AnyStyle | AnyStyleFunction) => StyledComponentType;

  View: (style: ViewStyle | ViewStyleFunction) => StyledComponentType;
  Text: (style: TextStyle | TextStyleFunction) => StyledComponentType;
  Image: (style: ImageStyle | ImageStyleFunction) => StyledComponentType;
  Touchable: (style: ViewStyle | TouchableStyleFunction) => StyledComponentType;
}

declare const styled: Styled;

export default styled;
