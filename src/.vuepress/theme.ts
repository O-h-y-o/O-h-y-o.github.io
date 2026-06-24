import { hopeTheme } from "vuepress-theme-hope";

// import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hotReload: true,
  hostname: "https://o-h-y-o.github.io",
  author: {
    name: "O-h-y-o",
    url: "https://github.com/O-h-y-o",
  },

  // iconAssets: "fontawesome-with-brands",

  logo: "/logo.png",

  // repo: "https://github.com/O-h-y-o/O-h-y-o.github.io",

  docsDir: "src",

  blog: {
    description: "개발발",

    // medias: {
    //   Baidu: "https://example.com",
    //   MrHope: ["https://mrhope.site", MR_HOPE_AVATAR],
    // },
  },

  sidebar,

  // navbar,

  // locales: {
  //   "/": {
  //     footer: "Delicious Jelly",
  //     displayFooter: true,
  //     blog: {
  //       description: "배고파",
  //       // intro: "/intro.html",
  //     },
  //     metaLocales: {
  //       editLink: "Edit this page on GitHub",
  //     },
  //   },
  // },

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //     "/ko/demo/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    blog: true,

    comment: {
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "O-h-y-o/GiscusComment",
      repoId: "R_kgDOJ33eeA",
      category: "Comment",
      categoryId: "DIC_kwDOJ33eeM4CXsKt",
      comment: true,
      mapping: "pathname",
      lazyLoading: false,
      strict: false,
    },

    // These features are enabled for demo, only preserve features you need here

    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },

  markdown: {
    echarts: true,
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        // oxlint-disable-next-line typescript/consistent-return
        replacer: ({ tag }) => {
          if (tag === "em") {
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
          }
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install @mathjax/src before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
});
