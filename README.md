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

#### Using primitives

By default, React Native's `Text`, `TouchableOpacity` and `View` are exposed to you, they can be directly used.

```js
styled.Text({ custom: 'styles' });
styled.Touchable({ custom: 'styles' });
styled.View({ custom: 'styles' });

// equivalent to
styled(Text)({ custom: 'styles' });
styled(TouchableOpacity)({ custom: 'styles' });
styled(View)({ custom: 'styles' });
```

#### Multiple style objects

```js
const Foo = styled.View({ custom: 'styles' }, { more: 'styles' } .. );
<Foo />; // <View style={{ custom: 'styles', more: 'styles' .. }} />
```

#### Dynamic styles based on props

```js
const Foo = styled.View(props => ({ padding: props.padded ? 10 : 0 }));
<Foo /> // <View style={{ padding: 0 }} />
<Foo padded /> // <View style={{ padding: 10 }} />
```

#### Combining static and dynamic styles

```js
const Foo = styled.View({ is: 'static' }, props => ({ is: 'dynamic' }));
```

#### Extending styles

```js
const Title = styled.Text({ fontSize: 20 });
// <Text style={{ fontSize: 20 }} />

const BoldTitle = Title.extend({ fontWeight: 'bold' });
// <Text style={{ fontSize: 20, fontWeight: 'bold' }} />

const RedBoldTitle = BoldTitle.extend({ color: 'red' });
// <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }} />
```

#### Using refs

```js
const List = styled(FlatList)({ custom: 'styles' });
<List ref={this.list} />; // based on React's forwardRef API (16.3.0)
// this.list.scrollTo({ y: 0 })
// or this.list.current.scrollTo({ y: 0 }) (with React.createRef)
```

#### Defining a custom display name for debugging

```js
styled(View, { displayName: 'YetAnotherView' });
// default names are StyledText, StyledTouchable, StyledView, StyledComponent, etc
```

#### Defining propTypes and defaultProps

```js
const StyledComponent = styled.View({ custom: 'styles' });
StyledComponent.propTypes = { .. };
StyledComponent.defaultProps = { .. };
```
