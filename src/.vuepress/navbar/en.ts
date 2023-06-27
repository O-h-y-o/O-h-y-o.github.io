import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Vuepress",
        icon: "vuepress",
        prefix: "vuepress/",
        children: [
          {
            text: "Getting Started",
            link: "start-blog",
          },
        ],
      },
      {
        text: "Quasar",
        icon: "pen-to-square",
        prefix: "quasar/",
        children: [
          {
            text: "Quasar Setting",
            icon: "pen-to-square",
            link: "start-project-quasar",
          },
        ],
      },
      {
        text: "Upbit",
        icon: "chart-line",
        prefix: "upbit/",
        children: [
          {
            text: "Setting",
            icon: "setting",
            link: "upbit-setting",
          },
          {
            text: "Chart",
            icon: "chart-line",
            link: "upbit-chart",
          },
          {
            text: "Market list",
            icon: "table-list",
            link: "upbit-market-list",
          },
          {
            text: "Trade",
            icon: "arrow-right-arrow-left",
            link: "upbit-trade",
          },
          {
            text: "Orderbook",
            icon: "book",
            link: "upbit-orderbook",
          },
        ],
      },
    ],
  },
]);
