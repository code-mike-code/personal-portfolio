module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {'^.+\\.(js|jsx)$': 'babel-jest',},
  moduleNameMapper: {
    '\\.(css|mp4|webp|svg)$': '<rootDir>/test/asset-mock.js',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  // Polyfill TextEncoder/TextDecoder (react-router w jsdom) + jest-dom matchers
  setupFiles: ['<rootDir>/jest.setup.js'],
};
