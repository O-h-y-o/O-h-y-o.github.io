<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <naive-provider>
    <n-card size="large" :title="props.title">
      <slot />
    </n-card>
  </naive-provider>
</template>
