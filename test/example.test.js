import React from 'react';

import { create as r } from 'react-test-renderer';

import { ScrollView, TouchableHighlight, View } from 'react-native';

import s from '../src';

const RedBox = s(View)({ height: 40, width: 40, backgroundColor: 'red' });

const Headline = s.Text({ fontSize: 28 });

const Button = s.Touchable({
  height: 40,
  width: 40,
  backgroundColor: 'green'
});

const BlueBox = s.View({ height: 40, width: 40, backgroundColor: 'blue' });

const Subtitle = s.Text(props => ({
  padding: props.padded ? 10 : 0,
  backgroundColor: 'red'
}));

const Title = s.Text({ fontSize: 20 });
const BoldTitle = Title.extend({ fontWeight: 'bold' });
const RedBoldTitle = BoldTitle.extend({ color: 'green' });

const OneLiner = s.Text({ color: 'blue' }).withProps({ numberOfLines: 1 });

const HighlightedButton = Button.withComponent(TouchableHighlight);

const ButtonText = s.Text({ color: 'green' });
const ButtonContainer = s.Touchable({ flex: 1 });
const AnotherButton = ButtonContainer.withChild(ButtonText);

export default class App extends React.PureComponent {
  container = React.createRef();

  componentDidMount() {
    this.container.current.setNativeProps({ foo: 123 });
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
    );
  }
}

const Container = s(ScrollView, { name: 'Container', multi: true })({
  style: ({ backgroundColor }) => ({ backgroundColor }),
  contentContainerStyle: { flex: 1, paddingTop: 20 }
});

Container.defaultProps = { backgroundColor: '#000' };

it('works', () => {
  const app = r(<App />).toJSON();
  expect(Container.displayName).toBe('Container');
  expect(app).toMatchSnapshot();
});
