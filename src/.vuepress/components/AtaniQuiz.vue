<script setup lang="ts">
import { ref } from "vue";
import ataniData from "../../utils/atani.json";

const props = defineProps({
  questionId: {
    type: Number,
    required: true,
  },
});

const atani = ataniData[props.questionId];

const answer = ref("");

const checkAnswer = ref(false);

const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  return 0;
}`;
</script>

<template>
  <naive-provider>
    <n-card size="large">
      <div style="margin-bottom: 12px">
        <span style="font-size: 16px">
          {{ atani.question }}
        </span>
      </div>

      <div v-if="atani.codeBlock" style="margin: 12px 0">
        <n-code :code="atani.codeBlock.code" language="cpp" show-line-numbers />
      </div>

      <div>
        <n-radio-group v-model:value="answer" :disabled="checkAnswer">
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

      <div style="display: flex; justify-content: center; margin-top: 20px">
        <n-button
          type="primary"
          :disabled="answer === '' || checkAnswer"
          @click="checkAnswer = true"
          ghost
        >
          정답 확인
        </n-button>
      </div>

      <div style="margin-top: 12px" v-if="checkAnswer">
        <div style="margin-bottom: 20px">
          정답은
          <n-gradient-text
            :type="
              answer === atani.options.find((e) => e.key === atani.answer)?.key
                ? 'success'
                : 'danger'
            "
          >
            {{ atani.options.find((e) => e.key === atani.answer)?.option }}
          </n-gradient-text>
          입니다.
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
  </naive-provider>
</template>
