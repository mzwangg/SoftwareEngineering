module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.jsx?$': 'babel-jest'
    },
    testMatch: [
      '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)'
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testEnvironment: 'jsdom'
  };
  