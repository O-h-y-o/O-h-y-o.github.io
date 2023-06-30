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
            text: "마켓리스트",
            icon: "table-list",
            link: "upbit-market-list",
          },
          {
            text: "거래현황",
            icon: "arrow-right-arrow-left",
            link: "upbit-trade",
          },
          {
            text: "오더북",
            icon: "book",
            link: "upbit-orderbook",
          },
        ],
      },
      {
        text: "정보",
        prefix: "info/",
        children: [
          {
            text: "카카오 로그인",
            link: "kakao-easy-login",
          },
          {
            text: "네이버 로그인",
            link: "naver-easy-login",
          },
        ],
      },
    ],
  },
]);
