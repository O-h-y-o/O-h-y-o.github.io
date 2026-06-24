---
order: 2
---

# 업비트 오픈API로 거래소 페이지 만들어보기 - 차트

차트에서는 처음 로드시에 차트를 그려줄 분봉 데이터를 가져와야합니다. <br/>
처음에는 50개만 가져 오겠습니다.

::: info Codes

```ts
// upbit-store.ts
export const useUpbitSocketStore = defineStore("upbitSocket", {
  state: (): ISocketState => ({
    chartTime: "1", // 차트 분봉
    selectCoin: "KRW-BTC", // 업비트 API에서 가져올 코인 이름
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

components 로 `UpbitChart.vue` 를 만들어주고, 차트를 그릴 데이터를 먼저 가져옵니다.

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
  // upbit candlestick 데이터 호출 api
  candleStickData.value = await axios.get<ICandleStickResponse>(
    `https://api.upbit.com/v1/candles/minutes/${upbit.chartTime}?market=${upbit.coinCode}&count=50`
  );
});
</script>
```

:::

::: tip

다음과 같은 결과물을 얻을 수 있습니다.

<div style="font-size: 12px">[{{ candleOneData[0] }} ... ]</div>

:::

차트를 그리기 위해 필요한 데이터는 `opening_price, high_price, low_price, trade_price, candle_acc_trade_volume, (candle_date_time_kst | candle_date_time_utc)` 입니다.

<!--
### 데이터를 많이 불러오고, 소켓으로도 계속 데이터를 받아와야 하기 때문에 축약형으로 이용해야합니다. 순서대로 `op, hp, lp, tp, tv, T` 라고 하겠습니다. -->

<br />

이후 `echarts` 와 `vue-echarts`를 설치해주고, `EchartsDefault.vue` 를 만들어줍니다.

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

`THEME_KEY` 와 연관된 내용은 다크모드를 이용할 것이면 넣어주고 아니라면 모두 빼도 됩니다. <br/>
`autoresize`는 window 크기에 맞춰 차트 크기를 자동조정 해주는 옵션입니다. <br/>
<br/>

다시 `UpbitChart.vue` 로 넘어와서, `EchartsDefault.vue` 에 데이터를 넘겨주도록 하겠습니다.
dayjs 는 선택사항입니다.

```ts
// rule.ts
export const colors = {
  up: "#D24F45",
  down: "#1261C4",
  same: "#000",
};
```

- up은 양봉일때, down은 음봉일때, same은 open과 close(tradePrice)의 값이 같을때 입니다.

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
import { useUpbitSocketStore } from 'src/stores/socket-upbit';

const upbit = useUpbitSocketStore();

const bindingOptions = ref({
  animationDuration: 100,
  animationDurationUpdate: 100,
  title: {
    text: ${upbit.coinFullName.ko},
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

위와 같은 차트가 나오면 성공입니다.

지금은 50개의 데이터만 불러오고, 실시간 데이터를 받아와 차트 데이터를 변경하고 있지 않기에 소켓을 연결하여 실시간으로 차트 데이터를 변경해보겠습니다.

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
    text: ${upbit.coinFullName.ko},
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

`스토어에 처리하지 않아도 되지만 여러군데에서 사용할 수 있어 확장성 측면에서 trade socket의 경우에는 스토어에서 작업하였습니다.` <br />
업비트 소켓서버 주소는 `wss://api.upbit.com/websocket/v1` 입니다.
실시간 trade 내역을 받아와야하니 소켓서버에 KRW-BTC 가 거래되고 있는 데이터를 달라고 요청합니다. <br />
그럼 `onmessage` 를 통하여 응답을 받아올 수 있습니다. 아래 박스의 데이터는 실시간으로 받아오고 있는 데이터이며 차트는 받아온 데이터로 실시간으로 변경해주고 있는 차트입니다. <br /> 다음과 같이 나오면 성공입니다.

<ClientOnly>
  <SocketChart />
</ClientOnly>

<br/>
<br/>

이로서 업비트 open API와 socket 서버를 이용하여 차트를 만들었습니다.

기본적인 기능만 만든 상태이고, 차트를 설정할 수 있는 기능은 추후에 다뤄보겠습니다.

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
