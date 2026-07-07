<script setup lang="ts">
import { NConfigProvider, darkTheme } from "naive-ui";
import { useDarkMode } from "vuepress-theme-hope/client";

const isDark = useDarkMode();
</script>

<template>
  <n-config-provider :theme="isDark.isDarkMode.value ? darkTheme : null">
    <slot />
  </n-config-provider>
</template>
