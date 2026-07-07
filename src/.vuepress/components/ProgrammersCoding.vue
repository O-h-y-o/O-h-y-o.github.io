<script setup lang="ts">
import codingTestData from "../../utils/codingtest.json";

const props = defineProps({
  testId: {
    type: Number,
    required: true,
  },
});

const columns = [
  {
    title: "입력",
    key: "input",
  },
  {
    title: "출력",
    key: "output",
  },
  {
    title: "설명",
    key: "explanation",
  },
];

const data =
  codingTestData.find((test) => test.id === props.testId)?.examples || [];

const problem = codingTestData.find((test) => test.id === props.testId);
</script>

<template>
  <naive-provider>
    <div v-if="problem">
      <n-card style="margin-bottom: 24px" :title="problem.title">
        <!-- 문제 설명 -->
        <p>{{ problem.stem }}</p>

        <!-- 제한 사항 -->
        <n-alert type="info" style="margin-bottom: 16px">
          <div v-for="(c, i) in problem.constraints" :key="i">{{ c }}</div>
        </n-alert>

        <!-- 입출력 예 -->
        <n-data-table :columns="columns" :data="data" :bordered="false" />

        <!-- 내 풀이 -->
        <slot />
      </n-card>
    </div>
  </naive-provider>
</template>

<style lang="scss">
table {
  display: table;
}
</style>
