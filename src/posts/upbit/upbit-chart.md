---
order: 2
---

# Creating an exchange page with Upbit Open API - Chart

The chart needs to get the sequencing data to draw the chart on first load. <br/>
I'll only bring 50 at first.

::: info Codes

```ts
// upbit-store.ts
export const useUpbitSocketStore = defineStore("upbitSocket", {
  state: (): ISocketState => ({
    chartTime: "1", // chart segmentation
    selectCoin: "KRW-BTC", // Coin name to get from Upbit API
    coinFullName: { ko: "비트코인", en: "Bitcoin" },
  }),
});
```

```ts
// global.d.ts
export {};

declare global {
  interface ISocketState {
    chartTime: string;
    selectCoin: string;
    coinFullName: { ko: string; en: string };
  }
}
```

:::

::: info Codes

Create `UpbitChart.vue` as components, and first import the data to draw the chart.

```vue
// UpbitChart.vue
<template>//</template>

<script setup lang="ts">
import { useUpbitStore } from "src/stores/upbit-store";
import { onBeforeMount } from "vue";

interface ICandleStickResponse {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

const upbit = useUpbitStore();
const candleStickData = ref();

onBeforeMount(() => {
  // upbit candlestick data call api
  candleStickData.value = await axios.get<ICandleStickResponse>(
    `https://api.upbit.com/v1/candles/minutes/${upbit.chartTime}?market=${upbit.coinCode}&count=50`
  );
});
</script>
```

:::

You'll get something like this:

::: tip

<div style="font-size: 12px; padding-bottom: 20px">[{{ candleOneData[0] }} ... ]</div>

:::

- The data needed to draw the chart is `opening_price, high_price, low_price, trade_price, candle_acc_trade_volume, (candle_date_time_kst | candle_date_time_utc)`.

<br />

After that, install `echarts` and `vue-echarts`, and create `EchartsDefault.vue`.

```sh
$ pnpm i echarts vue-echarts
```

```vue
// EchartsDefault.vue
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
```

Contents related to `THEME_KEY` can be included if dark mode is to be used, or omitted altogether. <br/>
`autoresize` is an option that automatically resizes the chart according to the window size.
<br/>
<br/>

Let's go back to `UpbitChart.vue` and pass the data to `EchartsDefault.vue`.
<br/>
Dayjs is optional.

```ts
// rule.ts
export const colors = {
  up: "#D24F45",
  down: "#1261C4",
  same: "#000",
};
```

- Up is when it is a bullish candlestick, down is when it is a negative candlestick, and same is when the values ​​of open and close(tradePrice) are the same.

```vue
// UpbitChart.vue
<template>
  <EchartsDefault
    style="width: 100%; height: 500px"
    :binding-options="bindingOptions"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import EchartsDefault from "src/components/EchartsDefault.vue";
import { colors } from "src/utils/rule";
import { useUpbitSocketStore } from "src/stores/socket-upbit";

const upbit = useUpbitSocketStore();

const bindingOptions = ref({
  animationDuration: 100,
  animationDurationUpdate: 100,
  title: {
    text: ${ upbit.coinFullName.en },
    subtext: ${ upbit.selectCoin },
    left: "center",
    top: 40,
    textStyle: {
      fontSize: 25,
    },
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: [
    {
      type: "category",
      data: [],
      boundaryGap: true,
      axisLabel: { show: false },
      axisPointer: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    {
      type: "category",
      gridIndex: 1,
      data: [],
      boundaryGap: true,
      axisLine: { lineStyle: { color: "#777" } },
      axisPointer: {
        type: "shadow",
        triggerTooltip: true,
      },
      nameLocation: "middle",
      nameTextStyle: {
        fontStyle: "italic",
        lineHeight: 40,
      },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitNumber: 2,
      axisLine: { lineStyle: { color: "#777" } },
      axisTick: { show: false },
      axisLabel: {
        inside: false,
        formatter: "{value}\n",
      },
      position: "right",
      splitArea: {
        show: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { inside: false, formatter: "{value}\n", fontSize: 10 },
      axisTick: { show: false },
      splitLine: { show: true },
      position: "right",
      nameTextStyle: {
        fontSize: 5,
      },
      splitArea: {
        show: true,
      },
    },
  ],
  grid: [
    {
      left: 20,
      right: 80,
      top: 110,
      height: 200,
    },
    {
      left: 20,
      right: 80,
      height: 80,
      top: 340,
    },
  ],
  dataZoom: [
    {
      show: true,
      type: "inside",
      filterMode: "filter",
      xAxisIndex: [0, 1],
    },
  ],
  series: [
    {
      name: "Volume",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [],
      itemStyle: {
        color: (value: any) =>
          value.data[2] === 0
            ? colors.same
            : value.data[2] === 1
            ? colors.up
            : colors.down,
      },
      barWidth: "70%",
      colorBy: "data",
    },
    {
      type: "candlestick",
      data: [],
      itemStyle: {
        color: colors.down,
        color0: colors.up,
        borderColor: colors.down,
        borderColor0: colors.up,
        borderColorDoji: colors.same,
      },
      barWidth: "70%",
      markLine: {
        symbol: "none",
        data: [
          {
            yAxis: 0,
            label: {
              color: "white",
              fontSize: 8,
              lineHeight: 14,
              padding: [0, 4],
              borderRadius: 4,
              formatter: ({ value }: any) => value.toLocaleString(),
            },
            lineStyle: {
              type: [0.5],
              dashOffset: 0.5,
            },
          },
        ],
      },
    },
  ],
});

const candleData = ref<{ [key: string]: number[] }>({});
const candleVolume = ref<{ [key: string]: number[] }>({});

const updateMarkLine = <T>(
  markLine: any,
  data: T,
  color: (item: T) => string
) => {
  markLine.data[0].yAxis = data[0];
  markLine.data[0].lineStyle.color = color(data);
  markLine.data[0].label.backgroundColor = color(data);
};

const getCandleAPI = async (count = 50) => {
  const response = await axios.get<ICandleStickResponse[]>(
    `https://api.upbit.com/v1/candles/minutes/${upbit.chartTime}?market=${upbit.selectCoin}&count=${count}`
  );

  for (const i in response.data.reverse()) {
    const data = response.data[i];
    const time = dayjs(data.candle_date_time_kst).format("HH:mm");
    const tp = data.trade_price;
    const op = data.opening_price;

    candleData.value[time] = [tp, op, data.low_price, data.high_price];

    const volumnKey = Object.keys(candleVolume.value);
    candleVolume.value[time] = [
      volumnKey.indexOf(time) === -1
        ? Object.keys(candleVolume.value).length
        : volumnKey.indexOf(time),
      Math.round(data.candle_acc_trade_volume * 1000) / 1000,
      tp === op ? 0 : tp > op ? 1 : 2,
    ];
  }

  bindingOptions.value.xAxis.forEach((axis) => {
    axis.data = Object.keys(candleData.value);
  });
  bindingOptions.value.series[0].data = Object.values(candleVolume.value);
  bindingOptions.value.series[1].data = Object.values(candleData.value);

  updateMarkLine(
    bindingOptions.value.series[1].markLine,
    Object.values(candleData.value)[Object.values(candleData.value).length - 1],
    ([tp, op]) => (tp === op ? colors.same : tp > op ? colors.up : colors.down)
  );
};

onBeforeMount(() => {
  getCandleAPI();
});
</script>
```

<ClientOnly>
  <UpbitChart />
</ClientOnly>

If you see a chart like the one above, you've succeeded.

Since we are only loading 50 data and are not changing the chart data by receiving real-time data, let's change the chart data in real time by connecting a socket.

```ts
// global.d.ts
declare global {
  interface ISocketState {
    …
    tradeData: ISocketTradeResponse;
    reloadCandle: Function;
  }

  interface ISocketTradeResponse {
    ab: string;
    c: string;
    cd: string;
    cp: number;
    pcp: number;
    sid: number;
    st: string;
    td: string;
    tms: number;
    tp: number;
    ttm: string;
    ttms: number;
    tv: number;
    ty: string;
  }
}
```

::: normal-demo Code

```ts
// socket-upbit.ts
import { defineStore } from "pinia";

let tradeSocket: WebSocket;

export const useUpbitSocketStore = defineStore("upbitSocket", {
  state: (): ISocketState => ({
    chartTime: "1",
    coinFullName: { ko: "비트코인", en: "Bitcoin" },
    selectCoin: "KRW-BTC",
    tradeData: {} as ISocketTradeResponse,
    reloadCandle: async () => {},
  }),
  actions: {
    connectTradeSocket() {
      tradeSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

      tradeSocket.onopen = (e: any) => {
        tradeSocket.send(
          `${JSON.stringify([
            { ticket: "trade" },
            { type: "trade", codes: ["KRW-BTC"] },
            { format: "SIMPLE" },
          ])}`
        );
      };

      tradeSocket.onmessage = async (payload: any) => {
        const r = (await new Response(
          payload.data
        ).json()) as ISocketTradeResponse;

        this.tradeData = r;
      };
    },

    disconnectTradeSocket() {
      tradeSocket.close();
    },
  },
});
```

:::

::: normal-demo Code

```vue
// SocketChart.vue
<template>
  <EchartsDefault
    style="width: 100%; height: 500px"
    :binding-options="bindingOptions"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import EchartsDefault from "src/components/EchartsDefault.vue";
import { colors } from "src/utils/rule";
import { useUpbitSocketStore } from "src/stores/socket-upbit";

const upbit = useUpbitSocketStore();

const bindingOptions = ref({
  animationDuration: 100,
  animationDurationUpdate: 100,
  title: {
    text: ${upbit.coinFullName.en},
    subtext: ${upbit.selectCoin},
    left: "center",
    top: 40,
    textStyle: {
      fontSize: 25,
    },
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: [
    {
      type: "category",
      data: [],
      boundaryGap: true,
      axisLabel: { show: false },
      axisPointer: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    {
      type: "category",
      gridIndex: 1,
      data: [],
      boundaryGap: true,
      axisLine: { lineStyle: { color: "#777" } },
      axisPointer: {
        type: "shadow",
        triggerTooltip: true,
      },
      nameLocation: "middle",
      nameTextStyle: {
        fontStyle: "italic",
        lineHeight: 40,
      },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitNumber: 2,
      axisLine: { lineStyle: { color: "#777" } },
      axisTick: { show: false },
      axisLabel: {
        inside: false,
        formatter: "{value}\n",
      },
      position: "right",
      splitArea: {
        show: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { inside: false, formatter: "{value}\n", fontSize: 10 },
      axisTick: { show: false },
      splitLine: { show: true },
      position: "right",
      nameTextStyle: {
        fontSize: 5,
      },
      splitArea: {
        show: true,
      },
    },
  ],
  grid: [
    {
      left: 20,
      right: 80,
      top: 110,
      height: 200,
    },
    {
      left: 20,
      right: 80,
      height: 80,
      top: 340,
    },
  ],
  dataZoom: [
    {
      show: true,
      type: "inside",
      filterMode: "filter",
      xAxisIndex: [0, 1],
    },
  ],
  series: [
    {
      name: "Volume",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [],
      itemStyle: {
        color: (value: any) =>
          value.data[2] === 0
            ? colors.same
            : value.data[2] === 1
            ? colors.up
            : colors.down,
      },
      barWidth: "70%",
      colorBy: "data",
    },
    {
      type: "candlestick",
      data: [],
      itemStyle: {
        color: colors.down,
        color0: colors.up,
        borderColor: colors.down,
        borderColor0: colors.up,
        borderColorDoji: colors.same,
      },
      barWidth: "70%",
      markLine: {
        symbol: "none",
        data: [
          {
            yAxis: 0,
            label: {
              color: "white",
              fontSize: 8,
              lineHeight: 14,
              padding: [0, 4],
              borderRadius: 4,
              formatter: ({ value }: any) => value.toLocaleString(),
            },
            lineStyle: {
              type: [0.5],
              dashOffset: 0.5,
            },
          },
        ],
      },
    },
  ],
});

const candleData = ref<{ [key: string]: number[] }>({});
const candleVolume = ref<{ [key: string]: number[] }>({});
const tradeData = computed(() => upbit.tradeData);
const stop = ref(false);

const updateMarkLine = <T>(
  markLine: any,
  data: T,
  color: (item: T) => string
) => {
  markLine.data[0].yAxis = data[0];
  markLine.data[0].lineStyle.color = color(data);
  markLine.data[0].label.backgroundColor = color(data);
};

const getCandleAPI = async (count = 50) => {
  const response = await axios.get<ICandleStickResponse[]>(
    `https://api.upbit.com/v1/candles/minutes/${upbit.chartTime}?market=${upbit.selectCoin}&count=${count}`
  );

  for (const i in response.data.reverse()) {
    const data = response.data[i];
    const time = dayjs(data.candle_date_time_kst).format("HH:mm");
    const tp = data.trade_price;
    const op = data.opening_price;

    candleData.value[time] = [tp, op, data.low_price, data.high_price];

    const volumnKey = Object.keys(candleVolume.value);
    candleVolume.value[time] = [
      volumnKey.indexOf(time) === -1
        ? Object.keys(candleVolume.value).length
        : volumnKey.indexOf(time),
      Math.round(data.candle_acc_trade_volume * 1000) / 1000,
      tp === op ? 0 : tp > op ? 1 : 2,
    ];
  }

  bindingOptions.value.xAxis.forEach((axis) => {
    axis.data = Object.keys(candleData.value);
  });
  bindingOptions.value.series[0].data = Object.values(candleVolume.value);
  bindingOptions.value.series[1].data = Object.values(candleData.value);

  updateMarkLine(
    bindingOptions.value.series[1].markLine,
    Object.values(candleData.value)[Object.values(candleData.value).length - 1],
    ([tp, op]) => (tp === op ? colors.same : tp > op ? colors.up : colors.down)
  );

  stop.value = false;
};

watch(
  tradeData,
  (r: ISocketTradeResponse) => {
    if (stop.value) {
      return;
    }

    const time = dayjs(r.tms).format("HH:mm");

    if (!candleData.value[time] || !candleVolume.value[time]) {
      stop.value = true;
      getCandleAPI(2);
      return;
    }

    const kline = candleData.value[time];
    const op = kline[1];
    const volume = candleVolume.value[time];
    const { tv, tp } = r;

    volume[1] = Math.round((volume[1] + tv) * 1000) / 1000;
    volume[2] = tp === op ? 0 : tp > op ? 1 : 2;

    kline[0] = tp;
    kline[2] = Math.min(kline[2], tp);
    kline[3] = Math.max(kline[3], tp);

    updateMarkLine(bindingOptions.value.series[1].markLine, kline, ([tp, op]) =>
      tp === op ? colors.same : tp > op ? colors.up : colors.down
    );
  },
  { deep: true }
);

onBeforeMount(() => {
  getCandleAPI();
  upbit.connectTradeSocket();
  upbit.reloadCandle = getCandleAPI;
});
</script>
```

:::

`It does not need to be processed in the store, but it can be used in many places, so in the case of trade sockets, we worked on the store in terms of scalability.` <br />
Upbit socket server address is `wss://api.upbit.com/websocket/v1`.
Since we need to receive real-time trade details, we request the socket server to receive the transaction data of KRW-BTC. <br />
Then you can get the response through `onmessage`. The data in the box below is the data being received in real time, and the chart is being changed in real time with the received data. <br /> If it looks like this, it's a success.

<!-- <SocketChart /> -->

<br/>
<br/>

As a result, I created a chart using the Upbit open API and socket server.

Only basic features have been created, and the ability to set charts will be discussed later.

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

const candleOneData = ref([]);

const getCandleOne = async () => {
  const response = await axios.get(
    `https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=1`
  );

  candleOneData.value = response.data;
};


onMounted(() => {
  getCandleOne();
});
</script>
