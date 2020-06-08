import babel from 'rollup-plugin-babel'

const rn = process.env.TARGET === 'react-native'

const external = ['react', rn && 'react-native']
const input = rn ? 'src/index.js' : 'src/styled.js'
const file = rn ? 'lib/rn.js' : 'lib/index.js'

export default {
  external,
  input,
  output: { file, format: 'cjs', exports: 'named' },
  plugins: [
    babel({
      presets: [['es2015', { modules: false }], 'react', 'stage-0'],
      plugins: ['external-helpers'],
      comments: false,
      babelrc: false,
    }),
  ],
}
