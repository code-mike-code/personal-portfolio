module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/components/Projects'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {'^.+\\.(js|jsx)$': 'babel-jest',},
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: [],
};
