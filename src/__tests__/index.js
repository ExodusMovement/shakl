import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { create as r } from 'react-test-renderer';

import s from '../';

s.Text = s(Text);
s.Touchable = s(TouchableOpacity);
s.View = s(View);

test('Creating a styled component', () => {
  const Foo = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});

test('Multiple style objects', () => {
  const Foo = s.View(
    { flex: 1 },
    { alignItems: 'center', justifyContent: 'center' }
  );
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  });
  expect(foo).toMatchSnapshot();
});

test('Later styles have higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' }, { backgroundColor: 'green' });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
});

test('Dynamic styles based on props', () => {
  const Foo = s.View(p => ({ padding: p.padded ? 10 : 0 }));
  const bar = r(<Foo />).toJSON();
  const baz = r(<Foo padded />).toJSON();
  expect(bar.props.style).toEqual({ padding: 0 });
  expect(baz.props.style).toEqual({ padding: 10 });
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('Combining static and dynamic styles', () => {
  const Foo = s.View({ flex: 1 }, p => ({ padding: p.padded ? 10 : 0 }));
  const bar = r(<Foo />).toJSON();
  const baz = r(<Foo padded />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1, padding: 0 });
  expect(baz.props.style).toEqual({ flex: 1, padding: 10 });
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('Extending styles', () => {
  const Foo = s.Text({ fontSize: 20 });
  const Bar = Foo.extend({ fontWeight: 'bold' });
  const Baz = Bar.extend({ fontSize: 20, color: 'red' });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  expect(foo.props.style).toEqual({ fontSize: 20 });
  expect(bar.props.style).toEqual({ fontSize: 20, fontWeight: 'bold' });
  expect(baz.props.style).toEqual({
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('Extending styles with styled(StyledComponent)', () => {
  const Foo = s.Text({ fontSize: 20 });
  const Bar = s(Foo)({ fontWeight: 'bold' });
  const Baz = s(Bar)({ fontSize: 20, color: 'red' });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  expect(foo.props.style).toEqual({ fontSize: 20 });
  expect(bar.props.style).toEqual({ fontSize: 20, fontWeight: 'bold' });
  expect(baz.props.style).toEqual({
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('Using refs', () => {
  const Foo = s.Touchable({ margin: 10 });
  let barRef;
  let bazRef;
  class Bar extends React.Component {
    componentDidMount() {
      barRef = this.foo;
    }
    foo = React.createRef();
    render() {
      return <Foo ref={this.foo} />;
    }
  }
  class Baz extends React.Component {
    componentDidMount() {
      bazRef = this.foo;
    }
    render() {
      return <Foo ref={ref => (this.foo = ref)} />;
    }
  }
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  expect(barRef.current).toBeDefined();
  expect(bazRef).toBeDefined();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('Defining a custom display name for debugging', () => {
  const Foo = s.Text({ color: 'red' });
  const Bar = s(View, { displayName: 'Bar' })({ flex: 1 });
  expect(Foo.displayName).toBe('StyledText');
  expect(Bar.displayName).toBe('Bar');
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('Defining propTypes and defaultProps', () => {
  const Foo = s.View({ flex: 1 });
  Foo.defaultProps = { bar: 'baz' };
  const foo = r(<Foo />).toJSON();
  expect(Foo.propTypes).toBeDefined();
  expect(foo.props.bar).toBe('baz');
  expect(foo).toMatchSnapshot();
});
