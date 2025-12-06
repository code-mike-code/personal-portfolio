// module.exports = {
//   testEnvironment: 'node',
//   roots: ['<rootDir>/src/components/Projects'],
//   moduleFileExtensions: ['js', 'jsx'],
//   transform: {'^.+\\.(js|jsx)$': 'babel-jest',},
//   testMatch: ['**/__tests__/**/*.test.js'],
//   setupFiles: [],
// };



module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Mockowanie stylów CSS i CSS Modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mockowanie obrazków i innych plików statycznych
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.{js,jsx}', '**/?(*.)+(spec|test).{js,jsx}'],
};