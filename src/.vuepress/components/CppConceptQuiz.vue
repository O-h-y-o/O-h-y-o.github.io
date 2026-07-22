<script setup lang="ts">
import { ref } from "vue";
import cppConceptsData from "../../utils/cppConcepts.json";
import { GRADER_ENDPOINT } from "../../utils/graderConfig";

interface GradeResult {
  verdict: string;
  feedback: string;
}

interface ExecuteResult {
  compileOutput: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

const props = defineProps({
  conceptIds: {
    type: Array,
    required: true,
  },
});

const conceptArray = cppConceptsData
  .filter((concept) => props.conceptIds.includes(concept.id))
  .map((concept) => {
    return {
      ...concept,
      userExplanation: ref(""),
      showAnswer: ref(false),
      userCode: ref(""),
      showCodeAnswer: ref(false),
      aiGradingExplanation: ref(false),
      aiResultExplanation: ref<GradeResult | null>(null),
      aiGradingCode: ref(false),
      aiResultCode: ref<GradeResult | null>(null),
      runningCode: ref(false),
      runResult: ref<ExecuteResult | null>(null),
    };
  });

const verdictType = (verdict: string) => {
  if (verdict === "correct") return "success";
  if (verdict === "partial") return "warning";
  return "error";
};

const verdictLabel = (verdict: string) => {
  if (verdict === "correct") return "정답";
  if (verdict === "partial") return "부분 정답";
  if (verdict === "incorrect") return "오답";
  return "채점 실패";
};

async function gradeExplanation(concept: (typeof conceptArray)[number]) {
  concept.aiGradingExplanation.value = true;
  concept.aiResultExplanation.value = null;
  try {
    const res = await fetch(GRADER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "explanation",
        question: concept.question,
        modelAnswer: concept.modelAnswer,
        userAnswer: concept.userExplanation.value,
      }),
    });
    concept.aiResultExplanation.value = await res.json();
  } catch (err) {
    concept.aiResultExplanation.value = {
      verdict: "unknown",
      feedback: "채점 서버에 연결하지 못했습니다.",
    };
  } finally {
    concept.aiGradingExplanation.value = false;
  }
}

async function gradeCode(concept: (typeof conceptArray)[number]) {
  concept.aiGradingCode.value = true;
  concept.aiResultCode.value = null;
  try {
    const res = await fetch(GRADER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "code",
        codePrompt: concept.codePrompt,
        modelCode: concept.codeAnswer.code,
        userAnswer: concept.userCode.value,
      }),
    });
    concept.aiResultCode.value = await res.json();
  } catch (err) {
    concept.aiResultCode.value = {
      verdict: "unknown",
      feedback: "채점 서버에 연결하지 못했습니다.",
    };
  } finally {
    concept.aiGradingCode.value = false;
  }
}

async function runCode(concept: (typeof conceptArray)[number]) {
  concept.runningCode.value = true;
  concept.runResult.value = null;
  try {
    const res = await fetch(`${GRADER_ENDPOINT}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: concept.userCode.value }),
    });
    concept.runResult.value = await res.json();
  } catch (err) {
    concept.runResult.value = {
      compileOutput: "",
      stdout: "",
      stderr: "실행 서버에 연결하지 못했습니다.",
      exitCode: null,
    };
  } finally {
    concept.runningCode.value = false;
  }
}
</script>

<template>
  <naive-provider>
    <n-card>
      <n-tabs type="line" animated>
        <n-tab-pane
          :name="concept.concept"
          :tab="concept.concept"
          display-directive="show:lazy"
          v-for="concept in conceptArray"
          :key="concept.id"
        >
          <n-card title="개념 설명해보기" style="margin-bottom: 16px">
            <div style="margin-bottom: 12px">
              {{ concept.question }}
            </div>

            <n-input
              v-model:value="concept.userExplanation.value"
              type="textarea"
              placeholder="자신의 말로 설명을 적으세요"
              :autosize="{ minRows: 3, maxRows: 8 }"
            />

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: 16px;
              "
            >
              <n-button
                type="primary"
                :disabled="concept.showAnswer.value"
                @click="concept.showAnswer.value = true"
                ghost
              >
                답안 확인
              </n-button>

              <n-button
                type="info"
                :loading="concept.aiGradingExplanation.value"
                :disabled="
                  concept.userExplanation.value === '' ||
                  concept.aiGradingExplanation.value
                "
                @click="gradeExplanation(concept)"
                ghost
              >
                채점
              </n-button>

              <n-button
                :disabled="
                  concept.userExplanation.value === '' &&
                  !concept.showAnswer.value
                "
                @click="
                  concept.userExplanation.value = '';
                  concept.showAnswer.value = false;
                  concept.aiResultExplanation.value = null;
                "
              >
                초기화
              </n-button>
            </div>

            <div style="margin-top: 16px" v-if="concept.showAnswer.value">
              <n-collapse :default-expanded-names="['answer']">
                <n-collapse-item title="답안" name="answer">
                  <div>{{ concept.modelAnswer }}</div>
                </n-collapse-item>
              </n-collapse>
            </div>

            <div
              style="margin-top: 16px"
              v-if="concept.aiResultExplanation.value"
            >
              <n-alert
                :type="verdictType(concept.aiResultExplanation.value.verdict)"
                :title="verdictLabel(concept.aiResultExplanation.value.verdict)"
              >
                {{ concept.aiResultExplanation.value.feedback }}
              </n-alert>
            </div>
          </n-card>

          <n-card title="코드로 확인해보기">
            <div style="margin-bottom: 12px">
              {{ concept.codePrompt }}
            </div>

            <CodeEditor v-model="concept.userCode.value" />

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: 16px;
              "
            >
              <n-button
                type="primary"
                :disabled="concept.showCodeAnswer.value"
                @click="concept.showCodeAnswer.value = true"
                ghost
              >
                예시 코드 확인
              </n-button>

              <n-button
                type="info"
                :loading="concept.aiGradingCode.value"
                :disabled="
                  concept.userCode.value === '' || concept.aiGradingCode.value
                "
                @click="gradeCode(concept)"
                ghost
              >
                채점
              </n-button>

              <n-button
                type="warning"
                :loading="concept.runningCode.value"
                :disabled="
                  concept.userCode.value === '' || concept.runningCode.value
                "
                @click="runCode(concept)"
                ghost
              >
                실행하기
              </n-button>

              <n-button
                :disabled="
                  concept.userCode.value === '' && !concept.showCodeAnswer.value
                "
                @click="
                  concept.userCode.value = '';
                  concept.showCodeAnswer.value = false;
                  concept.aiResultCode.value = null;
                  concept.runResult.value = null;
                "
              >
                초기화
              </n-button>
            </div>

            <div style="margin-top: 16px" v-if="concept.showCodeAnswer.value">
              <n-code
                :code="concept.codeAnswer.code"
                :language="concept.codeAnswer.language"
                show-line-numbers
                word-wrap
              />
            </div>

            <div style="margin-top: 16px" v-if="concept.aiResultCode.value">
              <n-alert
                :type="verdictType(concept.aiResultCode.value.verdict)"
                :title="verdictLabel(concept.aiResultCode.value.verdict)"
              >
                {{ concept.aiResultCode.value.feedback }}
              </n-alert>
            </div>

            <div style="margin-top: 16px" v-if="concept.runResult.value">
              <n-alert
                v-if="concept.runResult.value.compileOutput"
                type="error"
                title="컴파일 에러"
                style="margin-bottom: 8px"
              >
                <pre style="white-space: pre-wrap; margin: 0">{{
                  concept.runResult.value.compileOutput
                }}</pre>
              </n-alert>

              <n-card v-else title="실행 결과" size="small" embedded>
                <pre style="white-space: pre-wrap; margin: 0">{{
                  concept.runResult.value.stdout || "(출력 없음)"
                }}</pre>
                <pre
                  v-if="concept.runResult.value.stderr"
                  style="white-space: pre-wrap; margin: 8px 0 0; color: #d03050"
                  >{{ concept.runResult.value.stderr }}</pre
                >
              </n-card>
            </div>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </naive-provider>
</template>
