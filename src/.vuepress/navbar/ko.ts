import { navbar } from "vuepress-theme-hope";

export const koNavbar = navbar([
  "/ko/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/ko/posts/",
    children: [
      {
        text: "Vuepress",
        icon: "vuepress",
        prefix: "vuepress/",
        children: [
          {
            text: "시작하기",
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
            text: "Quasar 세팅",
            icon: "pen-to-square",
            link: "start-project-quasar",
          },
        ],
      },
      {
        text: "업비트",
        icon: "chart-line",
        prefix: "upbit/",
        children: [
          {
            text: "세팅",
            icon: "gear-code",
            link: "upbit-setting",
          },
          {
            text: "차트",
            icon: "chart-line",
            link: "upbit-chart",
          },
          {
            text: "오더북",
            icon: "book",
            link: "upbit-orderbook",
          },
          {
            text: "거래현황",
            icon: "arrow-right-arrow-left",
            link: "upbit-trade",
          },
        ],
      },
    ],
  },
]);
