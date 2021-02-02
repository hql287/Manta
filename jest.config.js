module.exports = {
  bail: true,
  // verbose: true,
  collectCoverage: true,
  setupFiles: ['./jest.shim.js', './jest.setup.js'],
  testURL: "http://localhost/",
  testPathIgnorePatterns: [
    '<rootDir>/test/'
  ]
};
