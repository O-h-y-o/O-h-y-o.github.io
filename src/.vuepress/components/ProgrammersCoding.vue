<script setup lang="ts">
import { computed } from "vue";
import codingTestData from "../../utils/codingtest.json";

const props = defineProps({
  testId: {
    type: Number,
    required: true,
  },
});

const data =
  codingTestData.find((test) => test.id === props.testId)?.examples || [];

const problem = codingTestData.find((test) => test.id === props.testId);

const hasExplanation = data.some((row) => "explanation" in row);

const formatCell = (value: unknown) =>
  Array.isArray(value) ? `[${value.join(", ")}]` : String(value);

const columns = computed(() => {
  const cols = [
    {
      title: "입력",
      key: "input",
      render: (row: Record<string, unknown>) => formatCell(row.input),
    },
    {
      title: "출력",
      key: "output",
      render: (row: Record<string, unknown>) => formatCell(row.output),
    },
  ];

  if (hasExplanation) {
    cols.push({
      title: "설명",
      key: "explanation",
      render: (row: Record<string, unknown>) => formatCell(row.explanation),
    });
  }

  return cols;
});
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
