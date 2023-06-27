---
order: 4
---

# 업비트 오픈API로 거래소 페이지 만들어보기 - 거래 현황

UpbitTrade.vue 파일을 새로 만들어줍니다.

지난번처럼 Trade API 를 먼저 호출해보겠습니다.

20개의 데이터를 가져오겠습니다.

::: info Codes

```ts
//global.d.ts
interface ITradeResponse {
  change_price: number;
  sequential_id: number;
  prev_closing_price: number;
  timestamp: number;
  trade_price: number;
  trade_volume: number;
  ask_bid: string;
  market: string;
  trade_date_utc: string;
  trade_time_utc: string;
}
```

```vue
// UpbitTrade.vue

<script setup lang="ts">
import axios from "axios";
import { onMounted } from "vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";

const upbit = useUpbitSocketStore();

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${upbit.selectCoin}&count=20`
  );

  const data = res.data as ITradeResponse[];
};

onMounted(() => {
  getTradeAPI();
});
</script>
```

`API Response 예시`

{{ showData }}

:::

<br/> <br/>

이번에는 받아온 데이터들의 키 값을 simple하게 바꿔주겠습니다.

::: info Codes

```vue
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";

const upbit = useUpbitSocketStore();

const tradeList = ref<ISocketTradeResponse[]>();

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${upbit.selectCoin}&count=20`
  );

  const data = res.data as ITradeResponse[];

  tradeList.value = convertTradeKeys(data);
};

onMounted(() => {
  getTradeAPI();
});
</script>
```

```ts
// utils/rule.ts
export const convertTradeKeys = (
  obj: ITradeResponse | ITradeResponse[]
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertTradeKeys(item));
  }

  const convertedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      convertedObj[convertTradeType[key]] = obj[key];
    }
  }
  return convertedObj;
};

export const convertTradeType = {
  change_price: "cp",
  sequential_id: "sid",
  prev_closing_price: "pcp",
  timestamp: "tms",
  trade_price: "tp",
  trade_volume: "tv",
  ask_bid: "ab",
  market: "market",
  trade_date_utc: "td",
  trade_time_utc: "ttm",
};
```

```ts
// global.d.ts
// 차트를 만들때의 타입 그대로
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
```

:::

convertTradeKeys라는 재귀함수를 이용하여 데이터 키 값들을 소켓으로 오는 simple 키 값으로 변경하였습니다.

데이터들을 정리를 하였으니 UI를 만들어 바로 적용시켜보겠습니다.

<UpbitTrade />

::: details Code

```vue
// UpbitTrade.vue
<template>
  <div class="trade-wrap">
    <ul class="trade-title">
      <li
        v-for="title in [
          '체결시간',
          '체결가격(KRW)',
          '체결량(BTC)',
          '체결금액(KRW)',
        ]"
        :key="title"
      >
        {{ title }}
      </li>
    </ul>

    <div class="trade-area">
      <ul class="trade-info-wrap">
        <li v-for="(data, i) in tradeList" :key="i" class="trade-info">
          <div class="time-zone">
            <span>{{ dayjs(data.tms).format("MM.DD") }}</span>
            <span>{{ dayjs(data.tms).format("HH:mm") }}</span>
          </div>

          <div class="trade-price">{{ data.tp.toLocaleString() }}</div>

          <div :class="data.ab">{{ data.tv }}</div>

          <div>
            {{ Math.round(data.tp * data.tv).toLocaleString() }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { useUpbitSocketStore } from "src/stores/socket-upbit";
import { convertTradeKeys } from "src/utils/rule";

const upbit = useUpbitSocketStore();
const tradeList = ref<ISocketTradeResponse[]>([]);

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${upbit.selectCoin}&count=20`
  );

  const data = res.data as ITradeResponse[];
  const convertedData = convertTradeKeys(data);
  tradeList.value.push(...convertedData);
};

onMounted(() => {
  getTradeAPI();
});
</script>

<style scoped lang="scss">
.trade-wrap {
  width: 100%;

  .trade-area {
    max-height: 500px;
    overflow-y: scroll;
  }
}

.trade-title {
  display: flex;
  border-bottom: 1px solid #eee;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & :first-child {
    text-align: left;
    width: 10%;
    min-width: 100px;
  }

  > li {
    padding: 5px 10px;
    font-size: 1.2px;
    color: rgb(63, 63, 63);
    width: 25%;
    text-align: right;
    margin: 0;
  }
}

.trade-info-wrap {
  padding: 0;
  margin: 0;
}

.trade-info {
  width: 100%;
  display: flex;
  justify-content: space-between;

  & :first-child {
    text-align: left;
    width: 10%;
    min-width: 100px;
    flex: 0;
  }

  div {
    font-size: 11px;
    flex: 1;
    display: block;
    text-align: right;
    padding: 5px 10px;

    &.trade-price {
      font-weight: 700;
    }
  }

  &:nth-child(2n) {
    background-color: #eeeeee;
  }
}
.time-zone {
  > span {
    margin-right: 7px;

    &:last-child {
      font-size: 10px;
      color: #777;
    }
  }
}

html[data-theme="dark"] {
  .trade-title {
    border-bottom: 1px solid #222;

    > li {
      color: #ddd;
    }
  }
  .trade-info:nth-child(2n) {
    background-color: #161616;
  }
}
</style>
```

:::

<br/> <br/>

이제 차트를 만들때 연결했던 Trade Socket 데이터를 가져와서 TradeList 에 넣어주겠습니다.

<SocketTrade />

::: details Code

```ts
// utils/rule.ts
export const debounce = (callback: Function, limit = 100) => {
  let timeout: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
};
```

```vue
// UpbitTrade.vue
<template>
  <div class="trade-wrap">
    <ul class="trade-title">
      <li
        v-for="title in [
          '체결시간(UTC)',
          '체결가격(KRW)',
          '체결량(BTC)',
          '체결금액(KRW)',
        ]"
        :key="title"
      >
        {{ title }}
      </li>
    </ul>

    <div class="trade-area" @scroll="scrolling">
      <ul class="trade-info-wrap">
        <li v-for="(data, i) in tradeList" :key="i" class="trade-info">
          <div class="time-zone">
            <span>{{ dayjs(data.tms).format("MM.DD") }}</span>
            <span>{{ dayjs(data.tms).format("HH:mm") }}</span>
          </div>

          <div class="trade-price">{{ data.tp.toLocaleString() }}</div>

          <div :class="data.ab">{{ data.tv }}</div>

          <div>
            {{ Math.round(data.tp * data.tv).toLocaleString() }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { useUpbitSocketStore } from "src/stores/socket-upbit";
import { convertTradeKeys, debounce } from "src/utils/rule";

const upbit = useUpbitSocketStore();
const btnSelect = ref(0);
const tradeList = ref<ISocketTradeResponse[]>([]);
const tradeData = computed(() => upbit.tradeData);

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${
      upbit.selectCoin
    }&count=20&${
      tradeList.value.at(-1) ? `${"cursor=" + tradeList.value.at(-1).sid}` : ""
    }`
  );

  const data = res.data as ITradeResponse[];
  const convertedData = convertTradeKeys(data);
  tradeList.value.push(...convertedData);
};

const scrolling = debounce((a: any) => {
  const percent = Math.floor(
    (a.target.scrollTop / (a.target.scrollHeight - a.target.clientHeight)) * 100
  );

  if (percent > 90) {
    getTradeAPI();
  }
});

watch(
  tradeData,
  () => {
    tradeList.value.unshift(tradeData.value);

    if (tradeList.value.length > 50) {
      tradeList.value.pop();
    }
  },
  { deep: true }
);

onMounted(() => {
  getTradeAPI();
});
</script>

<style scoped lang="scss">
.trade-wrap {
  width: 100%;

  .trade-area {
    max-height: 500px;
    overflow-y: scroll;
  }
}

.trade-title {
  display: flex;
  border-bottom: 1px solid #eee;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & :first-child {
    text-align: left;
    width: 10%;
    min-width: 100px;
  }

  > li {
    padding: 5px 10px;
    font-size: 1.2px;
    color: rgb(63, 63, 63);
    width: 25%;
    text-align: right;
    margin: 0;
  }
}

.trade-info-wrap {
  padding: 0;
  margin: 0;
}

.trade-info {
  width: 100%;
  display: flex;
  justify-content: space-between;

  & :first-child {
    text-align: left;
    width: 10%;
    min-width: 100px;
    flex: 0;
  }

  div {
    font-size: 11px;
    flex: 1;
    display: block;
    text-align: right;
    padding: 5px 10px;

    &.trade-price {
      font-weight: 700;
    }
  }

  &:nth-child(2n) {
    background-color: #eeeeee;
  }
}
.time-zone {
  > span {
    margin-right: 7px;

    &:last-child {
      font-size: 10px;
      color: #777;
    }
  }
}

html[data-theme="dark"] {
  .trade-title {
    border-bottom: 1px solid #222;

    > li {
      color: #ddd;
    }
  }
  .trade-info:nth-child(2n) {
    background-color: #161616;
  }
}
</style>
```

:::

무한스크롤 기능을 추가하였지만, API를 호출하는 조건이 스크롤 퍼센트 90% 이상일 때 이기에 해당 조건을 변경하거나 갯수 제한을 두어야합니다.

또한 계속해서 데이터를 추가만 한다면 브라우저 렉이 발생할 수 있으므로 소켓 데이터가 추가될때 tradeList 의 마지막 데이터를 없애주어야합니다.

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const showData = ref();

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=KRW-BTC&count=1`
  );

  showData.value = res.data;
};

onMounted(() => {
  getTradeAPI();
});
</script>
