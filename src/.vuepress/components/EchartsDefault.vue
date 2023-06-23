<template>
  <v-chart :option="props.bindingOptions" autoresize />
</template>

<script setup lang="ts">
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { provide } from "vue";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  MarkLineComponent,
} from "echarts/components";
import { CandlestickChart, BarChart } from "echarts/charts";

const props = defineProps({
  themeKey: {
    type: String,
    default: "white",
  },
  bindingOptions: Object,
});

use([
  CandlestickChart,
  BarChart,
  SVGRenderer,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  MarkLineComponent,
]);

provide(THEME_KEY, props.themeKey);
</script>
