export default {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    
    //used to import CSS files without throwing an error
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/__test__/styleMock.js',
    }
  };