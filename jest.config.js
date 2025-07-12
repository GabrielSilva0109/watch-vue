module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>/src', '<rootDir>/backend/src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};