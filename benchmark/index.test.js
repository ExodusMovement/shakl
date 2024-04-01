import React from 'react';

import { create as r } from 'react-test-renderer';

import fs from 'fs';

import Benchmark from 'benchmark';

import styled from 'styled-components/native'
import emotion from '@emotion/native';

import shakl from '../src';

const suite = new Benchmark.Suite();


suite.add('Shakl', () => () => {
  const Foo = shakl.View({ padding: 10 });
  r(<Foo />);
});

suite.add('Emotion', () => {
  const Foo = emotion.View`padding: 10px`
  r(<Foo />)
});

suite.add('Styled Components', () => {
  const Foo = styled.View`padding: 10px`
  r(<Foo />)
});

const results = {};

it('runs', () => {
  suite
    .on('complete', e => {
      const {
        stats: { mean: first },
        name: firstFunc
      } = e.currentTarget[0];

      let min = first;
      let max = first;

      let minFunc = firstFunc;
      let maxFunc = firstFunc;

      let output = '';

      e.currentTarget.forEach(({ stats: { mean }, name }) => {
        if (mean < min) {
          min = mean;
          minFunc = name;
        }

        if (mean > max) {
          max = mean;
          maxFunc = name;
        }

        const result = mean * 1000;

        results[name] = result;

        output += `${name} averaged ${result} ms\n`;
      });

      output += `\n${minFunc} is min, ${min * 1000} ms\n`;
      output += `diff is ${(((max - min) / max) * 100).toFixed(2)}%\n`;

      console.log(output);
    })
    .run();
});

afterAll(() => {
  const result = `const results = ${JSON.stringify(results, null, 2)};\n`
  fs.writeFileSync(
    `${__dirname}/results.js`,
    result
  );
});
