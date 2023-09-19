<template>
  <div
    class="pa-10 relative-position"
    :style="{
      left: `${cardStyle.x}px`,
      top: `${cardStyle.y}px`,
      width: `${cardStyle.width}px`,
      height: `${cardStyle.height}px`,
      minWidth: `${cardStyle.minWidth}px`,
      minHeight: `${cardStyle.minHeight}px`,
      cursor: cardStyle.edgeCursor,
    }"
    ref="moveCard"
    @mousemove="handleCursor"
    v-touch-pan.prevent.mouse="handleSizeCard"
    style="max-width: initial"
  >
    <q-card
      style="cursor: initial"
      class="full-width full-height"
      @mousemove.stop
      @mouseenter="handleMouseEnter"
    >
      <q-card-section class="pa-3 row">
        <q-space v-touch-pan.prevent.mouse="handleMoveCard" />

        <q-btn icon="close" flat dense v-close-popup />
      </q-card-section>

      <q-separator />

      <slot></slot>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  minWidth: { type: Number, default: 320 },
  minHeight: { type: Number, default: 320 },
});
const emits = defineEmits(["controlIndex"]);

const moveCard = ref();

const panning = ref();
const cardStyle = ref({
  minWidth: props.minWidth,
  minHeight: props.minHeight,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  previousWidth: 0,
  previousHeight: 0,
  previousX: 0,
  previousY: 0,
  zIndex: 0,
  edgeCursor: "",
});
const clickedPosition = ref(-1);

const setCardStyleAttr = () => {
  cardStyle.value.previousX = cardStyle.value.x;
  cardStyle.value.previousY = cardStyle.value.y;
  cardStyle.value.previousWidth = moveCard.value.clientWidth;
  cardStyle.value.previousHeight = moveCard.value.clientHeight;
};

const checkPointerPosition = (evt: any): number => {
  const rect = moveCard.value.getBoundingClientRect();

  const EDGE_SIZE = 15;
  const { x, y } = evt;

  const isTop = Math.abs(rect.top - y) < EDGE_SIZE;
  const isBottom = Math.abs(rect.top + rect.height - y) < EDGE_SIZE;
  const isLeft = x < rect.left + EDGE_SIZE;
  const isRight = x > rect.right - EDGE_SIZE;

  if (isTop && isLeft) return 0;
  if (isTop && isRight) return 1;
  if (isBottom && isRight) return 2;
  if (isBottom && isLeft) return 3;
  if (isTop) return 4;
  if (isRight) return 5;
  if (isBottom) return 6;
  if (isLeft) return 7;
  return -1;
};

const handleCursor = (evt: MouseEvent) => {
  const position = checkPointerPosition(evt);

  if (position === 0 || position === 2) {
    cardStyle.value.edgeCursor = "nwse-resize";
  } else if (position === 1 || position === 3) {
    cardStyle.value.edgeCursor = "nesw-resize";
  } else if (position === 4 || position === 6) {
    cardStyle.value.edgeCursor = "ns-resize";
  } else if (position === 5 || position === 7) {
    cardStyle.value.edgeCursor = "ew-resize";
  } else cardStyle.value.edgeCursor = "";
};

const handleSizeCard = ({ evt, ...newInfo }: any) => {
  if (newInfo.isFirst) {
    panning.value = true;

    setCardStyleAttr();

    clickedPosition.value = checkPointerPosition(evt);
  } else if (newInfo.isFinal) {
    panning.value = false;
  }

  if (clickedPosition.value < 0) return;

  const { x, y } = newInfo.offset;
  const { previousWidth, previousHeight } = cardStyle.value;

  if (clickedPosition.value === 0) {
    cardStyle.value.width = previousWidth - x;
    cardStyle.value.height = previousHeight - y;
  } else if (clickedPosition.value === 1) {
    cardStyle.value.width = previousWidth + x;
    cardStyle.value.height = previousHeight - y;
  } else if (clickedPosition.value === 2) {
    cardStyle.value.width = previousWidth + x;
    cardStyle.value.height = previousHeight + y;
  } else if (clickedPosition.value === 3) {
    cardStyle.value.width = previousWidth - x;
    cardStyle.value.height = previousHeight + y;
  } else if (clickedPosition.value === 4) {
    cardStyle.value.height = previousHeight - y;
  } else if (clickedPosition.value === 5) {
    cardStyle.value.width = previousWidth + x;
  } else if (clickedPosition.value === 6) {
    cardStyle.value.height = previousHeight + y;
  } else if (clickedPosition.value === 7) {
    cardStyle.value.width = previousWidth - x;
  }

  const possibleControlX =
    (clickedPosition.value < 4 ||
      clickedPosition.value === 5 ||
      clickedPosition.value === 7) &&
    cardStyle.value.width >= cardStyle.value.minWidth;

  const possibleControlY =
    (clickedPosition.value < 4 ||
      clickedPosition.value === 4 ||
      clickedPosition.value === 6) &&
    cardStyle.value.height >= cardStyle.value.minHeight;

  if (possibleControlX) {
    cardStyle.value.x = cardStyle.value.previousX + x / 2;
  }

  if (possibleControlY) {
    cardStyle.value.y = cardStyle.value.previousY + y / 2;
  }
};

const handleMoveCard = ({ evt, ...newInfo }: any) => {
  if (newInfo.isFirst) {
    panning.value = true;

    setCardStyleAttr();
  } else if (newInfo.isFinal) {
    panning.value = false;
  }

  const { x, y } = newInfo.offset;

  cardStyle.value.x = cardStyle.value.previousX + x;
  cardStyle.value.y = cardStyle.value.previousY + y;
};

const handleMouseEnter = () => {
  emits("controlIndex", moveCard.value);
};
</script>
