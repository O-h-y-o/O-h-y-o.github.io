<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  stepData: {
    type: Array as PropType<
      {
        title: string;
        description: string;
        icon: string;
        codeBlock: { title: string; code: string; language: string }[];
      }[]
    >,
    default: () => [],
  },
  vertical: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <naive-provider>
    <n-space vertical>
      <n-steps :vertical="vertical">
        <n-step
          :title="step.title"
          v-for="step in stepData"
          :key="step.title"
          style="white-space: pre-line"
        >
          <template #icon v-if="step.icon">
            <div
              class="n-step-indicator-slot__index"
              style="font-weight: bolder"
            >
              {{ step.icon }}
            </div>
          </template>

          <div>
            {{ step.description }}
          </div>

          <n-collapse style="margin-top: 20px" v-if="step.codeBlock">
            <n-collapse-item title="코드 예시" name="test" key="test">
              <n-card>
                <n-tabs type="line" animated>
                  <n-tab-pane
                    :name="`${codes.title}`"
                    :tab="`${codes.title}`"
                    v-for="codes in step.codeBlock"
                    :key="codes.title"
                  >
                    <n-code
                      :code="codes.code"
                      language="cpp"
                      show-line-numbers
                      word-wrap
                    />
                  </n-tab-pane>
                </n-tabs>
              </n-card>
            </n-collapse-item>
          </n-collapse>
        </n-step>
      </n-steps>
    </n-space>
  </naive-provider>
</template>
