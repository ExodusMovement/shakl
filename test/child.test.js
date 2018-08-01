import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('creates a styled component with a child', () => {
  const ButtonText = s.Text({ color: 'blue' });
  const Button = s.Touchable({ flex: 1 }).withChild(ButtonText);

  const button = r(<Button>Press me</Button>).toJSON();

  expect(button.type).toBe('View');
  expect(button.children[0].type).toBe('Text');
  expect(button.children[0].children[0]).toBe('Press me');
  expect(button.props.style).toEqual({ flex: 1, opacity: 1 });
  expect(button.children[0].props.style).toEqual({ color: 'blue' });

  expect(button).toMatchSnapshot();
});

it('creates a styled component with a child with custom props', () => {
  const CardText = s.Text({ color: 'blue' });
  const Card = s.View({ flex: 1 }).withChild(CardText, { numberOfLines: 3 });

  const card = r(<Card>Hello World!</Card>).toJSON();

  expect(card.children[0].children[0]).toBe('Hello World!');
  expect(card.props.style).toEqual({ flex: 1 });
  expect(card.children[0].props.style).toEqual({ color: 'blue' });
  expect(card.children[0].props.numberOfLines).toEqual(3);

  expect(card).toMatchSnapshot();
});

it('creates a styled component with a child with dynamic custom props', () => {
  const CardText = s.Text({ color: 'blue' });
  const Card = s.View({ flex: 1 }).withChild(CardText, parentProps => ({
    numberOfLines: parentProps.onLiner ? 1 : 3
  }));

  const card = r(<Card>Hello World!</Card>).toJSON();
  const cardOneLiner = r(<Card onLiner>Hello World!</Card>).toJSON();

  expect(card.children[0].children[0]).toBe('Hello World!');
  expect(card.props.style).toEqual({ flex: 1 });
  expect(card.children[0].props.style).toEqual({ color: 'blue' });
  expect(card.children[0].props.numberOfLines).toEqual(3);

  expect(cardOneLiner.children[0].children[0]).toBe('Hello World!');
  expect(cardOneLiner.props.style).toEqual({ flex: 1 });
  expect(cardOneLiner.children[0].props.style).toEqual({ color: 'blue' });
  expect(cardOneLiner.children[0].props.numberOfLines).toEqual(1);

  expect(card).toMatchSnapshot();
  expect(cardOneLiner).toMatchSnapshot();
});

it('attaches a ref to a child', () => {
  const CardText = s.Text({ color: 'blue' });
  const Card = s.View({ flex: 1 }).withChild(CardText, { numberOfLines: 3 });

  let cardRef;
  let cardTextRef;

  class Foo extends React.PureComponent {
    card = React.createRef();
    cardText = React.createRef();

    componentDidMount() {
      cardRef = this.card;
      cardTextRef = this.cardText;

      this.card.current.setNativeProps({});
      this.cardText.current.setNativeProps({});
    }

    render() {
      return <Card ref={this.card} childRef={this.cardText} />;
    }
  }

  const foo = r(<Foo />).toJSON();

  expect(cardRef).toBeDefined();
  expect(cardRef.current).toBeDefined();
  expect(cardTextRef).toBeDefined();
  expect(cardTextRef.current).toBeDefined();

  expect(foo).toMatchSnapshot();
});
