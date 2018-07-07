import React from 'react';

import { create as r } from 'react-test-renderer';

import fs from 'fs';

import Benchmark from 'benchmark';

import emotion from 'react-emotion';
import glamorous from 'glamorous-native';
import styled from 'styled-components';

import shakl from '../src';

const suite = new Benchmark.Suite();

const runSample = s => {
  const Foo = s('div')({ padding: 10 });
  r(<Foo />).toJSON();
};

suite.add('Shakl', () => runSample(shakl));
suite.add('Emotion', () => runSample(emotion));
suite.add('Glamorous Native', () => runSample(glamorous));
suite.add('Styled Components', () => runSample(styled));

const data = [];

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

        data.push(result);

        output += `${name} averaged ${result} ms\n`;
      });

      output += `\n${minFunc} is min, ${min * 1000} ms\n`;
      output += `diff is ${(((max - min) / max) * 100).toFixed(2)}%\n`;

      console.log(output);
    })
    .run();
});

afterAll(() => {
  fs.writeFile(
    `${__dirname}/data.js`,
    `const data = ${JSON.stringify(data, null, 2)};\n`
  );
});
