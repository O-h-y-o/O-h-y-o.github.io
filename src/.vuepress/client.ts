import { defineClientConfig } from "vuepress/client";
import NaiveProvider from "./components/NaiveProvider.vue";
import AtaniQuiz from "./components/AtaniQuiz.vue";
import ProgrammersCoding from "./components/ProgrammersCoding.vue";
import CppConceptQuiz from "./components/CppConceptQuiz.vue";
import CodeEditor from "./components/CodeEditor.vue";
import DefaultCard from "./components/DefaultCard.vue";
import NaiveStep from "./components/NaiveStep.vue";
import naive from "naive-ui";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(naive);
    app.component("NaiveProvider", NaiveProvider);
    app.component("AtaniQuiz", AtaniQuiz);
    app.component("ProgrammersCoding", ProgrammersCoding);
    app.component("CppConceptQuiz", CppConceptQuiz);
    app.component("CodeEditor", CodeEditor);
    app.component("DefaultCard", DefaultCard);
    app.component("NaiveStep", NaiveStep);
  },
});
