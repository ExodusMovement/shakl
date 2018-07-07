import React from 'react';

import { create as r } from 'react-test-renderer';

import s from '../src';

it('extends a styled component with extend()', () => {
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

it('extends a styled component with styled(Styled)', () => {
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

it('extends a styled component with null static styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend();

  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();

  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});

  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

it('extends a styled component with null dynamic styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend(() => null);

  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();

  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});

  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

it('extends a styled component with empty static styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend({});

  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();

  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});

  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

it('extends a styled component with empty dynamic styles', () => {
  const Foo = s.View();
  const Bar = Foo.extend(() => ({}));

  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();

  expect(foo.props.style).toEqual({});
  expect(bar.props.style).toEqual({});

  expect(foo).toMatchSnapshot();
  expect(bar).toMatchSnapshot();
});

it('extends a styled component with dynamic styles based on props', () => {
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

it('extends a styled component with custom props', () => {
  const Foo = s.Text({ fontSize: 20 });
  const Bar = Foo.extend({ fontWeight: 'bold' }).attrs({ bar: true });
  const Baz = Bar.extend({ color: 'red' }).attrs({ baz: true });

  const foo = r(<Foo />).toJSON();
  const bar = r(<Bar />).toJSON();
  const baz = r(<Baz />).toJSON();

  expect(bar.props.bar).toBe(true);
  expect(baz.props.bar).toBe(true);
  expect(baz.props.baz).toBe(true);
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
