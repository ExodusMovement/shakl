import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../';

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
