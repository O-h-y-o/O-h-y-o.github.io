import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";

export default defineUserConfig({
  base: "/",

  alias: {},

  locales: {
    "/": {
      lang: "en-US",
      title: "Delicious Jelly",
      description: "Give me a jelly",
    },
    "/ko/": {
      lang: "ko-KR",
      title: "Delicious Jelly",
      description: "Give me a jelly",
    },
  },

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
