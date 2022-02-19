module.exports = {
  plugins: ["stylelint-scss", "stylelint-selector-bem-pattern"],
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  ignoreFiles: ["node_modules/**/*.css", "**/assets/**/*.css", "src/scss/libs/**"],
  rules: {
    "at-rule-no-unknown": null,
    "selector-class-pattern": null,
    "scss/at-rule-no-unknown": true,
    "plugin/selector-bem-pattern": {
      componentName: "[A-Z]+",
      componentSelectors: {
        initial: "^\\.{componentName}(?:-[a-z]+)?$",
        combined: "^\\.combined-{componentName}-[a-z]+$",
      },
      utilitySelectors: "^\\.util-[a-z]+$",
    },
  },
};
