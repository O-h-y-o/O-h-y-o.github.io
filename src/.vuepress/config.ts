import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "ko-KR",
  title: "Delicious Jelly",
  description: "hihihi",

  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!posts/app/**",
    "!posts/info/**",
    "!posts/java/**",
    "!posts/nodejs/**",
    "!posts/vue3+quasar/**",
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
