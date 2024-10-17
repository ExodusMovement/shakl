// src/rn.ts
import styled, { StyledFunction, Config, StyledComponentType } from './index';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewProps,
  TextProps,
  ImageProps,
  TouchableOpacityProps,
  TextInputProps,
  ScrollViewProps,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

// Define the ExtendedStyledFunction interface extending StyledFunction
interface ExtendedStyledFunction extends StyledFunction {
  View: (
    componentStyle?: ((props: ViewProps) => ViewStyle) | ViewStyle,
    config?: Config<ViewProps>
  ) => StyledComponentType<ViewProps>;

  Text: (
    componentStyle?: ((props: TextProps) => TextStyle) | TextStyle,
    config?: Config<TextProps>
  ) => StyledComponentType<TextProps>;

  Image: (
    componentStyle?: ((props: ImageProps) => ImageStyle) | ImageStyle,
    config?: Config<ImageProps>
  ) => StyledComponentType<ImageProps>;

  Touchable: (
    componentStyle?: ((props: TouchableOpacityProps) => ViewStyle) | ViewStyle,
    config?: Config<TouchableOpacityProps>
  ) => StyledComponentType<TouchableOpacityProps>;

  TextInput: (
    componentStyle?:
      | ((props: TextInputProps) => TextStyle | ViewStyle)
      | TextStyle
      | ViewStyle,
    config?: Config<TextInputProps>
  ) => StyledComponentType<TextInputProps>;

  ScrollView: (
    componentStyle?: ((props: ScrollViewProps) => ViewStyle) | ViewStyle,
    config?: Config<ScrollViewProps>
  ) => StyledComponentType<ScrollViewProps>;

  // Add other primitives as needed
}

const extendedStyled = styled as ExtendedStyledFunction;


extendedStyled.View = styled(View, { name: 'styled(View)' })
extendedStyled.Text = styled(Text, { name: 'styled(Text)' })
extendedStyled.Image = styled(Image, { name: "styled(Image)" })
extendedStyled.Touchable = styled(TouchableOpacity, { name: 'styled(Touchable)' })


export default extendedStyled;
