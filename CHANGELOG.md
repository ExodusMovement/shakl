# 0.0.10

- **Breaking:** Removed theme support
- Support passing default styles to the factory.
- Support passing fixed styles to the factory.

# 0.0.9

- Support passing default props to the factory.

# 0.0.8

- Support dynamic props in `attrs()`. By default `attrs()` only overwrites the `defaultProps` of the component, now when you pass it a function it will allow for computed props.

```js
const MyText = styled.Text({ color: 'red' }).attrs(props => ({
  numberOfLines: props.oneLiner ? 1 : 3
}));

// equivalent to
<MyText /> // <Text style={{ color: 'red }} numberOfLines={3} />
<MyText oneLiner /> // <Text style={{ color: 'red }} numberOfLines={1} />
```

- Support passing props to `withChild()` through `withChild(Child, childProps)`.
- Support passing a ref to a child in `withChild()` through the parent's `childRef` prop.

```js
const CardText = styled.Text({ color: 'blue' });
const Card = styled.View({ flex: 1 }).withChild(CardText, { numberOfLines: 3 });

// equivalent to
const Card = ({ children, childRef, ...props }) => (
  <View style={{ flex: 1 }} {...props}>
    <Text ref={childRef} style={{ color: 'blue' }} numberOfLines={3}>
      {children}
    </Text>
  </View>
);

// you can also access parent props
const Card = styled.View({ flex: 1 }).withChild(CardText, parentProps => ({
  numberOfLines: parentProps.onLiner ? 1 : 3
}));

<Card>Hello World!</Card>;
// <View ..>
//   <Text ..>{children}</Text>
// </View>

<Card onLiner>Hello World!</Card>;
// <View ..>
//   <Text numberOfLines={1} ..>{children}</Text>
// </View>
```

# 0.0.5

- Simplify `attrs()` my making it just a thin wrapper that overwrites `defaultProps`.

# 0.0.4

- Support theming.
- Fixed a bug where `withComponent()` was showing the original component name.

# 0.0.3

- Initial release.
