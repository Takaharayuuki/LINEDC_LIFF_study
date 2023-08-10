module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsConfig: 'tsconfig.json' }],
  },
  testMatch: ['**/*.spec.(ts|tsx)'],
  globalSetup: './src/setupTests.ts',
};
