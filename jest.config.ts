export default {
  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js'],
    'ts-jest': {
      useESM: true
    }
  },
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-ts-esm',

  transformIgnorePatterns: [
    'node_modules/(?!(module-that-needs-to-be-transformed)/)'
  ]
}