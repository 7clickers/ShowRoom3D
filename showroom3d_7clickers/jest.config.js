export default {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    verbose: true,
    testResultsProcessor: "jest-junit",
    reporters: [
      "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-results",
        outputName: "junit.xml",
      },
    ],
  ],
    //used to import CSS files without throwing an error
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/__test__/styleMock.js',
    }
  };
