module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  verbose: true,
  preset: 'react-native',
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native|react-native-reanimated)/).*/',
  ],
  setupFilesAfterEnv: ['./jest-setup.js'],
}
