<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { onMounted, ref, watch } from "vue";
import { useDarkMode } from "vuepress-theme-hope/client";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import { ClientOnly } from "vuepress/client";

hljs.registerLanguage("cpp", cpp);

const isDark = ref(false);

watch(useDarkMode().isDarkMode, (newVal) => {
  isDark.value = newVal;
});

onMounted(() => {
  isDark.value = useDarkMode().isDarkMode.value;
});
</script>

<template>
  <client-only>
    <n-config-provider :theme="isDark ? darkTheme : null" :hljs="hljs">
      <slot />
    </n-config-provider>
  </client-only>
</template>
