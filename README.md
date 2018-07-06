# Shakl

[![npm version](https://badge.fury.io/js/shakl.svg)](https://badge.fury.io/js/shakl) [![Build Status](https://travis-ci.org/sonaye/shakl.svg?branch=master)](https://travis-ci.org/sonaye/shakl)

## Install

`yarn add shakl`

## Usage

### Creating a styled component

```js
import s from 'shakl';

const Foo = s(View)({ custom: 'styles' });
<Foo />; // <View style={{ custom: 'styles' }} />
```

### Using primitives

By default, React Native's `Text`, `TouchableOpacity` and `View` are exposed to you, they can be directly used.

```js
s.Text({ custom: 'styles' });
s.Touchable({ custom: 'styles' });
s.View({ custom: 'styles' });

// equivalent to
s(Text)({ custom: 'styles' });
s(TouchableOpacity)({ custom: 'styles' });
s(View)({ custom: 'styles' });
```

### Multiple style objects

```js
const Foo = s.View({ custom: 'styles' }, { more: 'styles' } .. );
<Foo />; // <View style={{ custom: 'styles', more: 'styles' .. }} />
```

### Dynamic styles based on props

```js
const Foo = s.View(props => ({ padding: props.padded ? 10 : 0 }));
<Foo /> // <View style={{ padding: 0 }} />
<Foo padded /> // <View style={{ padding: 10 }} />
```

### Combining static and dynamic styles

```js
const Foo = s.View({ is: 'static' }, props => ({ is: 'dynamic' }));
```

### Extending styles

```js
const Title = s.Text({ fontSize: 20 });
// <Text style={{ fontSize: 20 }} />

const BoldTitle = Title.extend({ fontWeight: 'bold' });
// <Text style={{ fontSize: 20, fontWeight: 'bold' }} />

const RedBoldTitle = BoldTitle.extend({ color: 'red' });
// <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }} />
```

### Defining custom props

```js
const Foo = s.Text({ color: 'blue' }).withProps({ numberOfLines: 1 });

// is equivalent to
<Text style={{ color: 'blue' }} numberOfLines={1} />;
```

### Wrapping another component

```js
const Button = s.Touchable({ flex: 1 });
const HighlightedButton = Button.withComponent(TouchableHighlight);

// is equivalent to
const HighlightedButton = props => (
  <TouchableHighlight style={{ flex: 1 }} {...props} />
);
```

### Wrapping a child

```js
const ButtonText = s.Text({ color: 'blue' });
const ButtonContainer = s.Touchable({ flex: 1 });
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
const Foo = s(FlatList, { multi: true })({
  style: { flex: 1 },
  contentContainerStyle: { flex: 2 },
  anotherStyleProp: { flex: 3 }
});

// dynamic styles work too
const Foo = s(FlatList, { multi: true })({
  style: ({ padded }) => ({ padding: padded ? 10 : 0 }),
  contentContainerStyle: ({ padded }) => ({ padding: padded ? 20 : 0 }),
  anotherStyleProp: ({ padded }) => ({ padding: padded ? 30 : 0 })
});
```

### Using refs

```js
const List = s(FlatList)({ custom: 'styles' });
<List ref={this.list} />; // based on React's forwardRef API (16.3.0)
// this.list.scrollTo({ y: 0 })
// or this.list.current.scrollTo({ y: 0 }) (with React.createRef)
```

### Defining a custom display name for debugging

```js
s(View, { name: 'YetAnotherView' });
// default names are styled(Text), styled(Touchable), styled(View), styled(Component), etc
```

### Defining propTypes and defaultProps

```js
const Foo = s.View({ custom: 'styles' });
Foo.propTypes = { .. };
Foo.defaultProps = { .. };
```
