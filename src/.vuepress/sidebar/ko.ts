import { sidebar } from "vuepress-theme-hope";

export const koSidebar = sidebar({
  "/ko/": [
    "",
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
  ],
});
