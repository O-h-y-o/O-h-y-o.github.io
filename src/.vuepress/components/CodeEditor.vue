<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { Compartment, EditorState, Prec } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { useThemeVars } from "naive-ui";
import { isDarkMode, subscribeThemeChange } from "./codeEditorTheme";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const editorContainer = ref<HTMLDivElement | null>(null);
const editableCompartment = new Compartment();
const themeCompartment = new Compartment();
const cursorCompartment = new Compartment();
const darkOverrideCompartment = new Compartment();
let view: EditorView | null = null;
let unsubscribeThemeChange: (() => void) | null = null;

const themeVars = useThemeVars();

function buildCursorTheme() {
  const color = themeVars.value.primaryColor;
  return EditorView.theme({
    ".cm-content": {
      caretColor: color,
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: color,
      borderLeftWidth: "2px",
    },
  });
}

// oneDark's own background (#282c34) is lighter than naive-ui's actual dark
// card/body tone, so darken it further when in dark mode.
function buildDarkOverride() {
  if (!isDarkMode()) return [];
  return EditorView.theme(
    {
      "&": {
        backgroundColor: "rgb(24, 24, 28)",
      },
      ".cm-gutters": {
        backgroundColor: "rgb(16, 16, 20)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      },
      ".cm-activeLine": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "rgba(255, 255, 255, 0.07)",
      },
    },
    { dark: true }
  );
}

const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "#f8f9fb",
    color: "#1f2328",
  },
  ".cm-content": {
    caretColor: "#1f2328",
  },
  ".cm-gutters": {
    backgroundColor: "#eef0f3",
    color: "#8a919e",
    borderRight: "1px solid #dfe3e8",
  },
  ".cm-activeLine": {
    backgroundColor: "#e9edf5",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#e2e7f0",
  },
});

onMounted(() => {
  if (!editorContainer.value) return;

  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        cpp(),
        keymap.of([indentWithTab]),
        editableCompartment.of(EditorView.editable.of(!props.disabled)),
        themeCompartment.of(isDarkMode() ? oneDark : lightTheme),
        Prec.highest(darkOverrideCompartment.of(buildDarkOverride())),
        Prec.highest(cursorCompartment.of(buildCursorTheme())),
        EditorView.theme({
          "&": { fontSize: "14px" },
          ".cm-scroller": {
            fontFamily: "'Fira Code', Consolas, Menlo, monospace",
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit("update:modelValue", update.state.doc.toString());
          }
        }),
      ],
    }),
    parent: editorContainer.value,
  });

  unsubscribeThemeChange = subscribeThemeChange(() => {
    view?.dispatch({
      effects: [
        themeCompartment.reconfigure(isDarkMode() ? oneDark : lightTheme),
        darkOverrideCompartment.reconfigure(buildDarkOverride()),
      ],
    });
  });
});

watch(themeVars, () => {
  view?.dispatch({
    effects: cursorCompartment.reconfigure(buildCursorTheme()),
  });
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (view && newValue !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: newValue },
      });
    }
  }
);

watch(
  () => props.disabled,
  (disabled) => {
    view?.dispatch({
      effects: editableCompartment.reconfigure(EditorView.editable.of(!disabled)),
    });
  }
);

onBeforeUnmount(() => {
  unsubscribeThemeChange?.();
  view?.destroy();
});
</script>

<template>
  <div ref="editorContainer" class="code-editor" />
</template>

<style scoped>
.code-editor {
  border: 1px solid var(--n-border-color, #d9d9d9);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;
  /* Reserve space up front so the container already has its final size
     before CodeMirror finishes its own (one-frame-later) height measurement.
     Without this, naive-ui's tab-switch height animation captures too small
     a height on first mount and then visibly snaps to the correct size. */
  min-height: 182px;
}

.code-editor :deep(.cm-editor) {
  min-height: 180px;
  max-height: 480px;
  overflow: auto;
}

.code-editor :deep(.cm-editor.cm-focused) {
  outline: none;
}
</style>
