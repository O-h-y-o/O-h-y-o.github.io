import { defineClientConfig } from "vuepress/client";
import NaiveProvider from "./components/NaiveProvider.vue";
import AtaniQuiz from "./components/AtaniQuiz.vue";
import ProgrammersCoding from "./components/ProgrammersCoding.vue";
import DefaultCard from "./components/DefaultCard.vue";
import naive from "naive-ui";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(naive);
    app.component("NaiveProvider", NaiveProvider);
    app.component("AtaniQuiz", AtaniQuiz);
    app.component("ProgrammersCoding", ProgrammersCoding);
    app.component("DefaultCard", DefaultCard);
  },
});
