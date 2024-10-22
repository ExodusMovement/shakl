import React, { Text } from 'react-native'
import styled from '../src/index'
import extendedStyled from '../src/rn'
import {useRef} from "react";

const StyledText = styled(Text)(({ transparent }: { transparent?: boolean; color: string }) => ({ flex: 1, opacity: transparent ? 0.5 : 1 }))
const StyledScalableText = StyledText.extend(({ big }: { big?: boolean }) => ({ fontSize: big ? 20 : 10 }))
const StyledTextWithObjectProps = styled(Text)({ flex: 1, opacity: 1 })
const ExtendedStyledText = extendedStyled.Text(({ transparent }: { transparent?: boolean; }) => ({ flex: 1, opacity: transparent ? 0.5 : 1 }))

const ExtenedStyledTextWithAttrs = extendedStyled.Text(({ transparent }: { transparent?: boolean; big?:boolean }) => ({ flex: 1, opacity: transparent ? 0.5 : 1 })).attrs(({big}: {big?: boolean}) => ({
    ellipsizeMode: big ? 'middle' : 'head',
}))
const ExtendedStyledTextWithStyle = extendedStyled(Text)((props: {specificColor: string}) => ({color: props.specificColor}))


const StyledView = extendedStyled.View({width: 100})
const StyledViewWithDynamicProps = extendedStyled.View((props: {active: boolean}) => ({width: props.active ? 100 : 50}))
const Row = extendedStyled.View((props: { spaced?: boolean; full?: boolean }) => ({
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: props.spaced ? 'space-between' : undefined,
    width: props.full ? '100%' : undefined,
}))


const StyledImage = extendedStyled.Image({width: 100})
const StyledImageWithDynamicProps = extendedStyled.Image((props: {active: boolean}) => ({width: props.active ? 100 : 50}))

const StyledTouchable = extendedStyled.Touchable({width: 100})
const StyledTouchableWithDynamicProps = extendedStyled.Image((props: {active: boolean}) => ({width: props.active ? 100 : 50}))
const ViewWithText = extendedStyled.View({}).withChild(StyledText)

const MyScreen = () => {
    const ref = useRef()
  return (
    <>
      <StyledText color="red" transparent>Hello Transparent World</StyledText>
      <StyledText ref={ref} color="red">Hello Transparent World with ref</StyledText>
      {/* should also work without transparent prop */}
      <StyledText color="red">Hello World</StyledText>
      {/* @ts-expect-error -- should not work without required color prop */}
      <StyledText>Hello World</StyledText>
      {/* @ts-expect-error -- big is only available on StyledScalableText */}
      <StyledText color="red" big>Hello World</StyledText>
      <StyledScalableText color="red" transparent big>Hi</StyledScalableText>
      {/* @ts-expect-error -- transparent prop is not allowed */}
      <StyledTextWithObjectProps transparent>Hi</StyledTextWithObjectProps>
      <ExtendedStyledText transparent>Hello Extended World</ExtendedStyledText>
      <ExtenedStyledTextWithAttrs transparent big>Hello Extended World</ExtenedStyledTextWithAttrs>
      <ExtendedStyledTextWithStyle specificColor="red" style={{fontSize: 10}}>Text with inline style</ExtendedStyledTextWithStyle>

      <StyledView>Just a View</StyledView>

        <Row style={{ justifyContent: 'center' }} full spaced={false}>
            <ExtendedStyledText>some text</ExtendedStyledText>
        </Row>


      <StyledViewWithDynamicProps active>View with dynamic style</StyledViewWithDynamicProps>

      <StyledImage>Image</StyledImage>
      <StyledImageWithDynamicProps active>Image with dynamic style</StyledImageWithDynamicProps>

      <StyledTouchable>Touchable</StyledTouchable>
      <StyledTouchableWithDynamicProps active>Touchable with dynamic style</StyledTouchableWithDynamicProps>

      <ViewWithText />
    </>
  )
}
