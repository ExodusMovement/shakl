# react-native-styled

[![npm version](https://badge.fury.io/js/react-native-styled.svg)](https://badge.fury.io/js/react-native-styled)

## Installation

`yarn add react-native-styled`

## Usage

#### Creating a styled component

```js
import styled from 'react-native-styled';

const Foo = styled(View)({ custom: 'styles' });
<Foo />; // <View style={{ custom: 'styles' }} />
```

#### Multiple style objects

```js
const Foo = styled(View)({ custom: 'styles' }, { more: 'styles' } .. );
<Foo />; // <View style={{ custom: 'styles', more: 'styles' .. }} />
```

#### Dynamic styles based on props

```js
const Foo = styled(View)(props => ({ padding: props.padded ? 10 : 0 }));
<Foo /> // <View style={{ padding: 0 }} />
<Foo padded /> // <View style={{ padding: 10 }} />
```

#### Combining static and dynamic styles

```js
const Foo = styled(View)({ is: 'static' }, props => ({ is: 'dynamic' }));
```

#### Extending styles

```js
const Title = styled(Text)({ fontSize: 20 });
// <Text style={{ fontSize: 20 }} />

const BoldTitle = Title.extend({ fontWeight: 'bold' });
// <Text style={{ fontSize: 20, fontWeight: 'bold' }} />

const RedBoldTitle = BoldTitle.extend({ color: 'red' });
// <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }} />
```

**NOTE:** Using `.extend()` instead of `styled(StyledComponent)` is recommend to ensure propagating styles properly.

#### Using refs

```js
const Btn = styled(TouchableOpacity)({ my: 'btn' });
<Btn ref={this.btn} />; // based on React's forwardRef API (16.3.0)
// this.btn.setOpacityTo(1)
// or this.btn.current.setOpacityTo(1) (with React.createRef)
```

#### Defining a custom display name for debugging

```js
styled(View, { displayName: 'MyView' });
// default names are StyledText, StyledTouchableOpacity, StyledView, etc
```

#### Defining propTypes and defaultProps

```js
const StyledComponent = styled(View)({ custom: 'styles' });
StyledComponent.propTypes = {};
StyledComponent.defaultProps = {};
```

#### Defining primitives (optional)

```js
styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity);
styled.View = styled(View);

// then yu can use them anywhere as:
styled.Text({ lorem: 'ipsum' });
styled.Touchable({ foo: 'bar' });
styled.View({ baz: 'qux' });
```
