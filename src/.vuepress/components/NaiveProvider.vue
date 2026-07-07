<script setup lang="ts">
import { NConfigProvider, darkTheme } from "naive-ui";
import { onMounted, ref } from "vue";
import { useDarkMode } from "vuepress-theme-hope/client";

const isDark = ref(false);

onMounted(() => {
  isDark.value = useDarkMode().isDarkMode.value;
});
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <slot />
  </n-config-provider>
</template>
