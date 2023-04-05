/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.test.ts'
  ],
  // forceExit because app.listen() results in an open handle
  forceExit: true
};