import flatten from '../src/flatten';

const fixture = {
  elementA: {
    styleA: 'moduleA/elementA/styleA',
    styleB: 'moduleA/elementA/styleB'
  },
  elementB: {
    styleB: 'moduleA/elementB/styleB'
  }
};

it('should merge style objects', () => {
  const style1 = { width: 10 };
  const style2 = { height: 20 };

  const flatStyle = flatten([style1, style2]);

  expect(flatStyle.width).toBe(10);
  expect(flatStyle.height).toBe(20);
});

it('should override style properties', () => {
  const style1 = { backgroundColor: '#000', width: 10 };
  const style2 = { backgroundColor: '#023c69', width: null };

  const flatStyle = flatten([style1, style2]);

  expect(flatStyle.backgroundColor).toBe('#023c69');
  expect(flatStyle.width).toBe(null);
});

it('should overwrite properties with `undefined`', () => {
  const style1 = { backgroundColor: '#000' };
  const style2 = { backgroundColor: undefined };

  const flatStyle = flatten([style1, style2]);

  expect(flatStyle.backgroundColor).toBe(undefined);
});

it('should not fail on falsy values', () => {
  expect(() => flatten([null, false, undefined])).not.toThrow();
});

it('should recursively flatten arrays', () => {
  const style1 = { width: 10 };
  const style2 = { height: 20 };
  const style3 = { width: 30 };

  const flatStyle = flatten([null, [], [style1, style2], style3]);

  expect(flatStyle.width).toBe(30);
  expect(flatStyle.height).toBe(20);
});

it('should not allocate an object when there is no style', () => {
  const nullStyle = flatten(null);
  const nullStyleAgain = flatten(null);

  expect(nullStyle).toBe(nullStyleAgain);
  expect(nullStyle).toBe(undefined);
});

it('should not allocate an object when there is a style', () => {
  const style = { a: 'b' };

  const nullStyle = flatten(style);

  expect(nullStyle).toBe(style);
});

it('should not allocate an object when there is a single class', () => {
  const singleStyle = flatten(fixture.elementA);
  const singleStyleAgain = flatten(fixture.elementA);

  expect(singleStyle).toBe(singleStyleAgain);
  expect(singleStyle).toEqual({
    styleA: 'moduleA/elementA/styleA',
    styleB: 'moduleA/elementA/styleB'
  });
});

it('should merge single class and style properly', () => {
  const style = { styleA: 'overrideA', styleC: 'overrideC' };

  const arrayStyle = flatten([fixture.elementA, style]);

  expect(arrayStyle).toEqual({
    styleA: 'overrideA',
    styleB: 'moduleA/elementA/styleB',
    styleC: 'overrideC'
  });
});

it('should merge multiple classes', () => {
  const AthenB = flatten([fixture.elementA, fixture.elementB]);
  const BthenA = flatten([fixture.elementB, fixture.elementA]);

  expect(AthenB).toEqual({
    styleA: 'moduleA/elementA/styleA',
    styleB: 'moduleA/elementB/styleB'
  });
  expect(BthenA).toEqual({
    styleA: 'moduleA/elementA/styleA',
    styleB: 'moduleA/elementA/styleB'
  });
});

it('should merge multiple classes with style', () => {
  const style = { styleA: 'overrideA' };

  const AthenB = flatten([fixture.elementA, fixture.elementB, style]);
  const BthenA = flatten([fixture.elementB, fixture.elementA, style]);

  expect(AthenB).toEqual({
    styleA: 'overrideA',
    styleB: 'moduleA/elementB/styleB'
  });
  expect(BthenA).toEqual({
    styleA: 'overrideA',
    styleB: 'moduleA/elementA/styleB'
  });
});

it('should flatten recursively', () => {
  const style = [{ styleA: 'newA', styleB: 'newB' }, { styleA: 'newA2' }];

  const AthenB = flatten([fixture.elementA, fixture.elementB, style]);

  expect(AthenB).toEqual({
    styleA: 'newA2',
    styleB: 'newB'
  });
});

it('should ignore invalid class names', () => {
  const invalid = flatten(1234, null);

  expect(invalid).toEqual(undefined);
});
