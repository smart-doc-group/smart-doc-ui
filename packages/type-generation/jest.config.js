module.exports = {
  testMatch: ['<rootDir>/__tests__/**/*.spec.(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
  collectCoverageFrom: ['src/*.(js|ts)', '!**/node_modules/**'],
};
