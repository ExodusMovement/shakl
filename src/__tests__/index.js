import React from 'react';

import { View } from 'react-native';

import { create as r } from 'react-test-renderer';

import s from '../';

test('creates a styled component', () => {
  const Foo = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with empty styles', () => {
  const Foo = s.View({});
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with multiple style objects', () => {
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

test('creates a styled component with dynamic styles based on props', () => {
  const Foo = s.View(p => ({ padding: p.padded ? 10 : 0 }));
  const bar = r(<Foo />).toJSON();
  const baz = r(<Foo padded />).toJSON();
  expect(bar.props.style).toEqual({ padding: 0 });
  expect(baz.props.style).toEqual({ padding: 10 });
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('creates a styled component with combined static and dynamic styles', () => {
  const Foo = s.View({ flex: 1 }, p => ({ padding: p.padded ? 10 : 0 }));
  const bar = r(<Foo />).toJSON();
  const baz = r(<Foo padded />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1, padding: 0 });
  expect(baz.props.style).toEqual({ flex: 1, padding: 10 });
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('extends styles with extend()', () => {
  const Foo = s.Text({ fontSize: 20 });
  const Bar = Foo.extend({ fontWeight: 'bold' });
  const Baz = Bar.extend({ color: 'red' });
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

test('extends styles with styled(Styled)', () => {
  const Foo = s.Text({ fontSize: 20 });
  const Bar = s(Foo)({ fontWeight: 'bold' });
  const Baz = s(Bar)({ color: 'red' });
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

test('forwards ref to wrapped component', () => {
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

test('has proper display name', () => {
  const Foo = s.Text({ color: 'red' });
  const Bar = s.View({ flex: 1 }); // s(View) returns 'StyledComponent'
  expect(Foo.displayName).toBe('StyledText');
  expect(Bar.displayName).toBe('StyledView');
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('allows providing a custom display name for debugging', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  expect(Foo.displayName).toBe('Foo');
  const foo = r(<Foo />).toJSON();
  expect(foo).toMatchSnapshot();
});

test('keeps custom display name when extended', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  const Bar = Foo.extend({ flex: 1 });
  expect(Foo.displayName).toBe('Foo');
  expect(Bar.displayName).toBe('Foo');
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('allows providing propTypes and defaultProps', () => {
  const Foo = s.View({ flex: 1 });
  Foo.defaultProps = { bar: 'baz' };
  const foo = r(<Foo />).toJSON();
  expect(Foo.propTypes).toBeDefined();
  expect(foo.props.bar).toBe('baz');
  expect(foo).toMatchSnapshot();
});

test('later styles have higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' }, { backgroundColor: 'green' });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
});
