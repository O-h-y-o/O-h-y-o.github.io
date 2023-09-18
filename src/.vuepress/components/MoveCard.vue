<template>
  <q-dialog seamless>
    <div
      class="pa-5 relative-position"
      :style="{
        left: `${cardStyle.x}px`,
        top: `${cardStyle.y}px`,
        width: `${cardStyle.width}px`,
        height: `${cardStyle.height}px`,
        cursor: 'move',
      }"
      ref="dialogCard"
      @mousemove="handleCursor"
      v-touch-pan.prevent.mouse="handleSizeCard"
      style="min-width: 320px; min-height: 320px"
    >
      <q-card
        @mousemove.stop
        @v-touch-pan.prevent.stop
        style="cursor: initial"
        class="full-width full-height"
      >
        <q-card-section class="pa-3 row">
          <q-space v-touch-pan.prevent.mouse="handleMoveCard" />

          <q-btn icon="close" flat dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section> 안녕하세요 </q-card-section>
        <q-card-section> 안녕하세요 </q-card-section>
        <q-card-section> 안녕하세요 </q-card-section>
        <q-card-section> 안녕하세요 </q-card-section>
        <q-card-section> 안녕하세요 </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialogCard = ref();

const info = ref();
const panning = ref();
const cardStyle = ref({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  previousWidth: 0,
  previousHeight: 0,
  previousX: 0,
  previousY: 0,
});

const handleCursor = (evt: MouseEvent) => {
  // console.log(evt);
};

const handleSizeCard = ({ evt, ...newInfo }: any) => {
  info.value = newInfo;

  if (newInfo.isFirst) {
    panning.value = true;

    cardStyle.value.previousX = cardStyle.value.x;
    cardStyle.value.previousY = cardStyle.value.y;
    cardStyle.value.previousWidth = dialogCard.value.clientWidth;
    cardStyle.value.previousHeight = dialogCard.value.clientHeight;
  } else if (newInfo.isFinal) {
    panning.value = false;
  }

  const { offset } = info.value;

  // cardStyle.value.x = cardStyle.value.previousX - offset.x;

  cardStyle.value.width = cardStyle.value.previousWidth + offset.x;
  cardStyle.value.height = cardStyle.value.previousHeight + offset.y;
};

const handleMoveCard = ({ evt, ...newInfo }: any) => {
  info.value = newInfo;

  if (newInfo.isFirst) {
    panning.value = true;

    cardStyle.value.previousX = cardStyle.value.x;
    cardStyle.value.previousY = cardStyle.value.y;
  } else if (newInfo.isFinal) {
    panning.value = false;
  }

  const { offset } = info.value;

  cardStyle.value.x = cardStyle.value.previousX + offset.x;
  cardStyle.value.y = cardStyle.value.previousY + offset.y;
};
</script>
