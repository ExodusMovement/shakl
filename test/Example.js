import React from 'react'

import { ScrollView, TouchableHighlight, View } from 'react-native'

import s from '../src'

// dom
// s.View = s('div');
// s.Text = s('p');
// s.Touchable = s('button');

// const View = 'div';
// const TouchableHighlight = 'button';
// const ScrollView = 'div';

const RedBox = s(View)({ height: 40, width: 40, backgroundColor: 'red' })

const Headline = s.Text({ fontSize: 28 })

const Button = s.Touchable({
  height: 40,
  width: 40,
  backgroundColor: 'green',
})

const BlueBox = s.View({ height: 40, width: 40, backgroundColor: 'blue' })

const Subtitle = s.Text((props) => ({
  padding: props.padded ? 10 : 0,
  backgroundColor: 'red',
}))

const Title = s.Text({ fontSize: 20 })

const BoldTitle = Title.extend({ fontWeight: 'bold' })

const RedBoldTitle = BoldTitle.extend({ color: 'green' })

const OneLiner = s.Text({ color: 'blue' }).attrs({ numberOfLines: 1 })

const HighlightedButton = Button.withComponent(TouchableHighlight)

const ButtonText = s.Text({ color: 'green' })

const AnotherButton = s.Touchable({ flex: 1 }).withChild(ButtonText)

export default class Example extends React.PureComponent {
  container = React.createRef()

  componentDidMount() {
    if (!this.container.current) throw new Error('ref is not working')
  }

  render() {
    return (
      <Container backgroundColor="#f5fcff" ref={this.container}>
        <RedBox />
        <Headline>Hello world</Headline>
        <Button />
        <BlueBox />
        <Subtitle>Hello world</Subtitle>
        <Subtitle padded>Hello world</Subtitle>
        <Title>Hello world</Title>
        <BoldTitle>Hello world</BoldTitle>
        <RedBoldTitle>Hello world</RedBoldTitle>
        <OneLiner>{'Hello world '.repeat(5)}</OneLiner>
        <HighlightedButton onPress={() => null}>
          <RedBox />
        </HighlightedButton>
        <AnotherButton>BUTTON</AnotherButton>
      </Container>
    )
  }
}

const Container = s(ScrollView, { name: 'Container', multi: true })({
  style: ({ backgroundColor }) => ({ backgroundColor }),
  contentContainerStyle: { flex: 1, paddingTop: 20 },
})

Container.defaultProps = { backgroundColor: '#000' }
