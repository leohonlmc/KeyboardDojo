module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "jest-static-stubs/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
