<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>

  <div class="chart-start-info absolute-center">
    <div class="chart-start-text-area">Arrived in {{ timeRemaining }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const timeRemaining = ref("");
const canvas = ref<HTMLCanvasElement>();
const width = ref(0);
const height = ref(0);

const RADIAN = Math.PI * 2;
const DEGREE = RADIAN / 360;

const START_ANGLE = -35 * DEGREE;
const END_ANGLE = 215 * DEGREE;
const CIRCLE_START = -60 * DEGREE;
const CIRCLE_END = 240 * DEGREE;
const intervalTimeSet = 1000 / 10;

const duration = 60 * 1000;

let ctx: CanvasRenderingContext2D | null | undefined = null;
let CIRCLE_SIZE = 0;
let CIRCLE_X = 0;
let CIRCLE_Y = 0;

const moveImg = new Image();
const earth = new Image();

const setTimeRemaining = (tick: number) => {
  timeRemaining.value = ((duration - tick) / 1000).toFixed(2).replace(".", ":");
};

const startDraw = () => {
  setInterval(() => {
    draw();
  }, intervalTimeSet);
};

const draw = () => {
  const time = new Date();
  const tick = time.getSeconds() * 1000 + time.getMilliseconds();
  setTimeRemaining(tick);

  if (!ctx) {
    return;
  }

  const t = (tick % duration) / duration;

  ctx.clearRect(0, 0, width.value, height.value);

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "rgba(32, 37, 49, 0.5)";
  ctx.strokeStyle = "#e6af1c";
  ctx.arc(CIRCLE_X, CIRCLE_Y, CIRCLE_SIZE, 0, RADIAN);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.translate(CIRCLE_X, CIRCLE_Y);
  ctx.rotate(END_ANGLE);
  ctx.translate(CIRCLE_SIZE, 0);
  ctx.drawImage(earth, -7, -7);
  ctx.restore();

  ctx.save();
  ctx.translate(CIRCLE_X, CIRCLE_Y);
  ctx.rotate(START_ANGLE + (END_ANGLE - START_ANGLE) * t);
  ctx.translate(CIRCLE_SIZE, 0);
  ctx.drawImage(moveImg, -13, -30, 50, 50);
  ctx.restore();
};

onMounted(() => {
  ctx = canvas.value?.getContext("2d");
  if (ctx == null) {
    return;
  }

  width.value = canvas.value?.clientWidth ?? 0;
  height.value = canvas.value?.clientHeight ?? 0;

  ctx.globalCompositeOperation = "destination-over";

  moveImg.src = "../../../assets/images/move-rocket.png";
  earth.src = "../../../assets/images/move-circle.png";

  const padding = 50;
  const CIRCLE_WIDTH = width.value / 2 - padding;
  const CIRCLE_HEIGHT = height.value / 2 - padding;
  CIRCLE_SIZE = Math.min(CIRCLE_WIDTH, CIRCLE_HEIGHT);
  CIRCLE_X = width.value / 2;
  CIRCLE_Y = height.value / 2;

  startDraw();
});
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
}

.chart-start-info {
  background-color: #e6af1c;
  border-radius: 0.3rem;
  padding: 3px 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 30px;
  width: 150px;

  .chart-start-text-area {
    line-height: 1.8;
    font-size: 1rem;
    padding: 0 0.5em;
    background-color: #de9c05;
    box-shadow: inset 0px -3px 1px -2px rgba(244, 223, 151, 0.8),
      inset 0px 2px 1px -1px #d57c0f;
    border-radius: 0.3rem;
    text-align: center;
    font-weight: 500;
    color: #ffffff;
    text-shadow: -0.5px 0.5px 1px #cd680b;
  }
}
</style>
