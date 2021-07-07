module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "max-len": "off",
    "import/extensions": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "linebreak-style": ["off", "windows"]
  }
};
