module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "parser": "babel-eslint",
  "rules":{
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.spec.js"]}],
    "react/forbid-prop-types": [1, { "forbid": ["array", "object"] }],
    "quote-props": ["error", "consistent"],
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  }
};