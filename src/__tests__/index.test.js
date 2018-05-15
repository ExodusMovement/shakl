import React from 'react';

import { Animated, Text, TouchableOpacity, View } from 'react-native';

import { create as r } from 'react-test-renderer';

import s from '../';

test('creates a styled component', () => {
  const Foo = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with null styles', () => {
  const Foo = s.View();
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with empty static styles', () => {
  const Foo = s.View({});
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with null dynamic styles', () => {
  const Foo = s.View(() => null);
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with empty dynamic styles', () => {
  const Foo = s.View(() => ({}));
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
});

test('creates a styled component with multiple static style objects', () => {
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
  const foo = r(<Foo />).toJSON();
  const fooPadded = r(<Foo padded />).toJSON();
  expect(foo.props.style).toEqual({ padding: 0 });
  expect(fooPadded.props.style).toEqual({ padding: 10 });
  expect(foo).toMatchSnapshot();
  expect(fooPadded).toMatchSnapshot();
});

test('creates a styled component with combined static and dynamic styles', () => {
  const Foo = s.View({ flex: 1 }, p => ({ padding: p.padded ? 10 : 0 }));
  const foo = r(<Foo />).toJSON();
  const fooPadded = r(<Foo padded />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1, padding: 0 });
  expect(fooPadded.props.style).toEqual({ flex: 1, padding: 10 });
  expect(foo).toMatchSnapshot();
  expect(fooPadded).toMatchSnapshot();
});

test('extends a styled component with extend()', () => {
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

test('extends a styled component with styled(Styled)', () => {
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

test('extends a styled component with null styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend();
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('extends a styled component with empty static styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend({});
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('extends a styled component with null dynamic styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend(() => null);
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('extends a styled component with empty dynamic styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend(() => ({}));
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('extends a styled component with multiple static style objects', () => {
  const Foo = s.View({ margin: 10 });
  const Bar = Foo.extend(
    { flex: 1 },
    { alignItems: 'center', justifyContent: 'center' }
  );
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({ margin: 10 });
  expect(bar.props.style).toEqual({
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('extends a styled component with dynamic styles based on props', () => {
  const Foo = s.Text();
  const Bar = Foo.extend(p => ({ padding: p.padded ? 10 : 0 }));
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const barPadded = r(<Bar padded />).toJSON();
  expect(bar.props.style).toEqual({ padding: 0 });
  expect(barPadded.props.style).toEqual({ padding: 10 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(barPadded).toMatchSnapshot();
});

test('extends a styled component with combined static and dynamic styles', () => {
  const Foo = s.Text();
  const Bar = Foo.extend({ flex: 1 }, p => ({ padding: p.padded ? 10 : 0 }));
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const barPadded = r(<Bar padded />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1, padding: 0 });
  expect(barPadded.props.style).toEqual({ flex: 1, padding: 10 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(barPadded).toMatchSnapshot();
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
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('StyledText');
  expect(foo).toMatchSnapshot();
});

test('allows providing a custom display name for debugging', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(Foo.displayName).toBe('Foo');
  expect(foo).toMatchSnapshot();
});

test('falls back to Component.name if Component.displayName cannot be inferred', () => {
  const Foo = () => null;
  const Bar = s(Foo)();
  const foo = r(<Bar />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(Foo.displayName).not.toBeDefined();
  expect(Foo.name).toBe('Foo');
  expect(Bar.displayName).toBe('StyledFoo');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('keeps custom display name when extended', () => {
  const Foo = s(View, { displayName: 'Foo' })({ flex: 1 });
  const Bar = Foo.extend({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(Foo.displayName).toBe('Foo');
  expect(Bar.displayName).toBe('Foo');
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

test('accepts style prop', () => {
  const Foo = s.View({ margin: 10 });
  const foo = r(<Foo style={{ flex: 1 }} />).toJSON();
  expect(foo.props.style).toEqual({ margin: 10, flex: 1 });
  expect(foo).toMatchSnapshot();
});

test('passes a single child properly', () => {
  const Foo = s.View({ flex: 1 });
  const foo = r(
    <Foo>
      <Foo />
    </Foo>
  ).toJSON();
  expect(foo.children.length).toBe(1);
  expect(foo).toMatchSnapshot();
});

test('passes multiple children properly', () => {
  const Foo = s.View({});
  const foo = r(
    <Foo>
      <Foo />
      <Foo />
      <Foo />
    </Foo>
  ).toJSON();
  expect(foo.children.length).toBe(3);
  expect(foo).toMatchSnapshot();
});

test('style prop should have a higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' });
  const foo = r(<Foo style={{ backgroundColor: 'green' }} />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
});

test('extended styles should have a higher priority', () => {
  const Foo = s.View({ backgroundColor: 'red' });
  const Bar = Foo.extend({ backgroundColor: 'green' });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo.props.style).toEqual({ backgroundColor: 'red' });
  expect(bar.props.style).toEqual({ backgroundColor: 'green' });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('exposes primitives', () => {
  const Foo = s(Text)();
  const Bar = s(TouchableOpacity, { displayName: 'StyledTouchable' })();
  const Baz = s(View, { displayName: 'StyledView' })();
  const FooPrimitive = s.Text();
  const BarPrimitive = s.Touchable();
  const BazPrimitive = s.View();
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  const fooPrimitive = r(<FooPrimitive />).toJSON();
  const barPrimitive = r(<BarPrimitive />).toJSON();
  const bazPrimitive = r(<BazPrimitive />).toJSON();
  expect(s.Text).toBeDefined();
  expect(s.Touchable).toBeDefined();
  expect(s.View).toBeDefined();
  expect(JSON.stringify(foo)).toEqual(JSON.stringify(fooPrimitive));
  expect(JSON.stringify(bar)).toEqual(JSON.stringify(barPrimitive));
  expect(JSON.stringify(baz)).toEqual(JSON.stringify(bazPrimitive));
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
  expect(fooPrimitive).toMatchSnapshot();
  expect(barPrimitive).toMatchSnapshot();
  expect(bazPrimitive).toMatchSnapshot();
});

test('exposed primitives have proper display names', () => {
  const Foo = s.Text({ color: 'red' });
  const Bar = s.Touchable({ flex: 1 });
  const Baz = s.View({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();
  expect(Foo.displayName).toBe('StyledText');
  expect(Bar.displayName).toBe('StyledTouchable');
  expect(Baz.displayName).toBe('StyledView');
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
  expect(baz).toMatchSnapshot();
});

test('works with animated components', () => {
  const Foo = s(Animated.View)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
});

// investigate whether this should be supported
test.skip('creates a styled component of a functional component', () => {
  const Foo = () => <View />;
  const Bar = s(Foo)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// investigate whether this should be supported
test.skip('creates a styled component of a class component', () => {
  class Foo extends React.Component {
    render() {
      return <View />;
    }
  }
  const Bar = s(Foo)({ flex: 1 });
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(bar.props.style).toEqual({ flex: 1 });
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// faulty
test.skip('apply animated styles to animated components', () => {
  const opacity = new Animated.Value(0);
  const Foo = s(Animated.View)({ opacity });
  const foo = r(<Foo />).toJSON();
  expect(opacity).toBe(0);
  expect(foo.props.style).toEqual({ opacity: 0 });
  Animated.timing(opacity, { toValue: 1, duration: 250 }).start();
  // TODO: figure out jest timers
  jest.useFakeTimers();
  setTimeout(() => expect(foo.props.style).toEqual({ opacity: 1 }), 250);
  jest.runAllTimers();
  expect(opacity).toBe(1);
  expect(foo.props.style).toEqual({ opacity: 1 });
  expect(foo).toMatchSnapshot();
});

// faulty, may require lib edits
test.skip('should throw when called with an invalid element', () => {
  const Foo = () => <View />;
  class Bar extends React.Component {
    render() {
      return <View />;
    }
  }
  const els = [undefined, null, 123, [], <Foo />, <Bar />];
  els.forEach(el => expect(() => s(el)()).toThrow());
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

// requires some lib edits, it's better to have clean props
test.skip("shouldn't append style prop if empty", () => {
  const Foo = s.View();
  const foo = r(<Foo />).toJSON();
  expect(foo.props.style).not.toBeDefined();
  expect(foo).toMatchSnapshot();
});

// TODO
test.skip('should keep prop types from parent', () => {});
test.skip('should keep default props from parent', () => {});
test.skip('should keep custom static member from parent', () => {});
