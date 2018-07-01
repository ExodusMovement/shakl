import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

test('forwards ref to wrapped component', () => {
  const Foo = s.Touchable({ margin: 10 });
  let barRef;
  class Bar extends React.Component {
    componentDidMount() {
      barRef = this.foo;
    }

    render() {
      return <Foo ref={ref => (this.foo = ref)} />;
    }
  }
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(barRef).toBeDefined();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

test('forwards ref created with React.createRef() to wrapped component', () => {
  const Foo = s.Touchable({ margin: 10 });
  let barRef;
  class Bar extends React.Component {
    foo = React.createRef();

    componentDidMount() {
      barRef = this.foo;
    }

    render() {
      return <Foo ref={this.foo} />;
    }
  }
  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  expect(barRef).toBeDefined();
  expect(barRef.current).toBeDefined();
  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});
