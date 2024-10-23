import { javascriptReactBabelPreset, typescriptReactBabelPreset } from '@exodus/eslint-config-exodus'

const config = [
  javascriptReactBabelPreset,
  typescriptReactBabelPreset
].flat()

export default config
