# 0.0.6

- Support dynamic props in `attrs()`. By default `attrs()` only overwrites the `defaultProps` of the component, now when you pass it a function it will allow for computed props.

```js
const MyText = styled.Text({ color: 'red' }).attrs(props => ({
  numberOfLines: props.oneLiner ? 1 : 3
}));

<MyText /> // <Text style={{ color: 'red }} numberOfLines={3} />
<MyText oneLiner /> // <Text style={{ color: 'red }} numberOfLines={1} />
```

# 0.0.5

- Simplify `attrs()` my making it just a thin wrapper that overwrites `defaultProps`.

# 0.0.4

- Support theming.
- Fixed a bug where `withComponent()` was showing the original component name.

# 0.0.3

- Initial release.
