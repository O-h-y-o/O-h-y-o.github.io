import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

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
    sitemapPlugin({
      hostname: "https://o-h-y-o.github.io",
      changefreq: "always",
    }),
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
