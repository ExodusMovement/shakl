// src/rn.ts
import styled from './index'
import {
  Image,
  ImageProps, ImageStyle,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'


const extended = Object.assign(styled,{
  View: styled<ViewProps, ViewStyle>(View, { name: 'styled(View)' }),
  Text: styled<TextProps, TextStyle>(Text, { name: 'styled(Text)' }),
  Image: styled<ImageProps, ImageStyle>(Image, { name: "styled(Image)" }),
  Touchable: styled<TouchableOpacityProps, ViewStyle>(TouchableOpacity, { name: 'styled(Touchable)' }),
})

export default extended;
