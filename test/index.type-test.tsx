import React, { Text } from 'react-native'
import styled from '../src/index'

const StyledText = styled(Text)(({ transparent }: { transparent?: boolean; color: string }) => ({ flex: 1, opacity: transparent ? 0.5 : 1 }))
const StyledScalableText = StyledText.extend(({ big }: { big?: boolean }) => ({ fontSize: big ? 20 : 10 }))
const StyledTextWithObjectProps = styled(Text)({ flex: 1, opacity: 1 })

const MyScreen = () => {
  return (
    <>
      <StyledText color="red" transparent>Hello Transparent World</StyledText>
      {/* should also work without transparent prop */}
      <StyledText color="red">Hello World</StyledText>
      {/* @ts-expect-error -- should not work without required color prop */}
      <StyledText>Hello World</StyledText>
      {/* @ts-expect-error -- big is only available on StyledScalableText */}
      <StyledText color="red" big>Hello World</StyledText>
      <StyledScalableText color="red" transparent big>Hi</StyledScalableText>
      {/* @ts-expect-error -- transparent prop is not allowed */}
      <StyledTextWithObjectProps transparent>Hi</StyledTextWithObjectProps>
    </>
  )
}