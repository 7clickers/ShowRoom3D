const preset = {
    name:'@babel/preset-env',
    verbose: true,
    testResultsProcessor: "jest-junit",
  testEnvironment: "node",
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
    testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
export default preset;