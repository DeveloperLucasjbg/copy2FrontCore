import { theme } from "@avla/ui-design";

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./.storybook/**/*.{js,ts}",
    "./node_modules/@avla/ui-design/**/*.{js,html,ts}"
  ],
  mode: "jit",
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
    },
  },
  plugins: [],
};
