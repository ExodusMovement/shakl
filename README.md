# Shakl

[![npm version](https://badge.fury.io/js/shakl.svg)](https://badge.fury.io/js/shakl) [![Build Status](https://travis-ci.org/sonaye/shakl.svg?branch=master)](https://travis-ci.org/sonaye/shakl)

<img src="shakl.svg" alt="Shakl logo" width="128">

## Features

- Supports static styles and dynamic styles (based on props).
- Supports components extension with `extend()`, .
- Supports components composition with `withProps()`, `withComponent()` and `withChild()`.
- Supports styling other style props, e.g. `contentContainerStyle`, you can "truly" style any component.
- Exposes basic primitives such as `View`, `Text` and `Touchable`,
- Uses regular inline styles under the hood (performance boost).
- Works with React DOM too!
- No dependencies, all just React goodness.
- ~2 KB in size, with less than 100 lines of code.

> <img src="benchmarks/chart.png" alt="Benchmarks" width="600">
> Time required to create a simple styled component (in ms).

## Install

`yarn add shakl`

## Usage

### Creating a styled component

```js
import styled from 'shakl';

const Foo = styled(View)({ custom: 'styles' });
<Foo />; // <View style={{ custom: 'styles' }} />
```

### Using primitives

By default, React Native's `View`, `Text`, and `TouchableOpacity` are exposed to you, they can be directly used.

```js
styled.View({ custom: 'styles' });
styled.Text({ custom: 'styles' });
styled.Touchable({ custom: 'styles' });

// equivalent to
styled(Text)({ custom: 'styles' });
styled(TouchableOpacity)({ custom: 'styles' });
styled(View)({ custom: 'styles' });
```

### Dynamic styles based on props

```js
const Foo = styled.View(props => ({ padding: props.padded ? 10 : 0 }));
<Foo /> // <View style={{ padding: 0 }} />
<Foo padded /> // <View style={{ padding: 10 }} />
```

### Extending styles

```js
const Title = styled.Text({ fontSize: 20 });
// <Text style={{ fontSize: 20 }} />

const BoldTitle = Title.extend({ fontWeight: 'bold' });
// <Text style={{ fontSize: 20, fontWeight: 'bold' }} />

const RedBoldTitle = BoldTitle.extend({ color: 'red' });
// <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }} />
```

### Defining custom props

```js
const Foo = styled.Text({ color: 'blue' }).withProps({ numberOfLines: 1 });

// is equivalent to
<Text style={{ color: 'blue' }} numberOfLines={1} />;
```

### Wrapping another component

```js
const Button = styled.Touchable({ flex: 1 });
const HighlightedButton = Button.withComponent(TouchableHighlight);

// is equivalent to
const HighlightedButton = props => (
  <TouchableHighlight style={{ flex: 1 }} {...props} />
);
```

### Wrapping a child

```js
const ButtonText = styled.Text({ color: 'blue' });
const ButtonContainer = styled.Touchable({ flex: 1 });
const Button = ButtonContainer.withChild(ButtonText);

// is equivalent to
const Button = ({ children, ...props }) => (
  <TouchableOpacity style={{ flex: 1 }} {...props}>
    <Text style={{ color: 'blue' }}>{children}</Text>
  </TouchableOpacity>
);
```

### Handling contentContainerStyle-like styles

```js
const Foo = styled(FlatList, { multi: true })({
  style: { flex: 1 },
  contentContainerStyle: { flex: 2 },
  anotherStyleProp: { flex: 3 }
});

// dynamic styles work too
const Foo = styled(FlatList, { multi: true })({
  style: ({ padded }) => ({ padding: padded ? 10 : 0 }),
  contentContainerStyle: ({ padded }) => ({ padding: padded ? 20 : 0 }),
  anotherStyleProp: ({ padded }) => ({ padding: padded ? 30 : 0 })
});
```

### Using refs

```js
const List = styled(FlatList)({ custom: 'styles' });
<List ref={this.list} />; // based on React's forwardRef API (16.3.0)
// this.list.scrollTo({ y: 0 })
// or this.list.current.scrollTo({ y: 0 }) (with React.createRef)
```

### Defining a custom display name for debugging

```js
styled(View, { name: 'YetAnotherView' });
// default names are styled(Text), styled(Touchable), styled(View), styled(Component), etc
```

### Defining propTypes and defaultProps

```js
const Foo = styled.View({ custom: 'styles' });
Foo.propTypes = { .. };
Foo.defaultProps = { .. };
```

### Usage with React DOM

```js
// Shakl is internally decoupled from React Native and can be used in the DOM
import styled from 'shakl';

// no exposed primitives however, feel free to add your own
const styled.div = styled('div');

const Foo = styled.div({ custom: 'styles' });
```
