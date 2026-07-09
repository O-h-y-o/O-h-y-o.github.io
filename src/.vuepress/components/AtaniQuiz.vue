<script setup lang="ts">
import { ref } from "vue";
import ataniData from "../../utils/atani.json";

const props = defineProps({
  questionIds: {
    type: Array,
    required: true,
  },
});

const ataniArray = ataniData
  .filter((atani) => props.questionIds.includes(atani.id))
  .map((atani) => {
    return {
      ...atani,
      answer: ref(""),
      checkAnswer: ref(false),
    };
  });
</script>

<template>
  <naive-provider>
    <n-card>
      <n-tabs type="line" animated>
        <n-tab-pane
          :name="`문제 ${atani.id + 1}`"
          :tab="`문제 ${atani.id + 1}`"
          v-for="atani in ataniArray"
          :key="atani.id"
        >
          <n-card>
            <div style="margin-bottom: 16px">
              {{ atani.question }}
            </div>

            <div v-if="atani.codeBlock" style="margin: 12px 0">
              <n-code
                :code="atani.codeBlock.code"
                language="cpp"
                show-line-numbers
                word-wrap
              />
            </div>

            <div>
              <n-radio-group
                v-model:value="atani.answer.value"
                :disabled="atani.checkAnswer.value"
              >
                <n-space vertical>
                  <n-radio
                    :value="options.key"
                    v-for="options in atani.options"
                    :key="options.key"
                  >
                    {{ options.option }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </div>

            <div
              style="display: flex; justify-content: center; margin-top: 20px"
            >
              <n-button
                type="primary"
                :disabled="atani.answer.value === '' || atani.checkAnswer.value"
                @click="atani.checkAnswer.value = true"
                ghost
              >
                정답 확인
              </n-button>
            </div>

            <div style="margin-top: 12px" v-if="atani.checkAnswer.value">
              <div style="margin-bottom: 20px">
                <div>정답</div>

                <n-gradient-text
                  :type="
                    atani.answer.value ===
                    atani.options.find((e) => e.key === atani.answer.value)?.key
                      ? 'success'
                      : 'danger'
                  "
                  style="text-wrap: wrap"
                >
                  {{
                    atani.options.find((e) => e.key === atani.answer.value)
                      ?.option
                  }}
                </n-gradient-text>
              </div>

              <n-collapse>
                <n-collapse-item
                  :title="item.option"
                  :name="item.key"
                  v-for="item in atani.options.filter((e) => e.description)"
                  :key="item.key"
                >
                  <div>{{ item.description }}</div>
                </n-collapse-item>
              </n-collapse>
            </div>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </naive-provider>
</template>
