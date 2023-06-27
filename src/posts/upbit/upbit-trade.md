---
order: 4
---

# Creating an exchange page with Upbit Open API - Transaction Status

Create a new UpbitTrade.vue file.

Like last time, let's call the Trade API first.

Let's import 20 pieces of data.

::: info Codes

```ts
// socket-upbit.ts
state: () ISocketState => ({
  ...
  reloadTrade: async () => {},
})
```

```ts
// global.d.ts
interface ISocketState {
  ...
  reloadTrade: Function;
}

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
  upbit.reloadTrade = getTradeAPI;
});
</script>
```

`API Response 예시`

{{ showData }}

:::

<br/> <br/>

This time, we will change the key value of the received data to a simple one.

::: info Codes

```vue
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";
import { convertTradeKeys } from "src/utils/rule";

const upbit = useUpbitSocketStore();

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${upbit.selectCoin}&count=20`
  );

  const data = res.data as ITradeResponse[];
  const convertedData = convertTradeKeys(data);
  upbit.tradeList.push(...convertedData);
};

onMounted(() => {
  getTradeAPI();
  upbit.reloadTrade = getTradeAPI;
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
// As the type when creating the chart
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

Using a recursive function called convertTradeKeys, data key values ​​were changed to simple key values ​​that come to the socket.

Now that we have organized the data, let's create a UI and apply it right away.

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
        <li v-for="(data, i) in upbit.tradeList" :key="i" class="trade-info">
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

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${upbit.selectCoin}&count=20`
  );

  const data = res.data as ITradeResponse[];
  const convertedData = convertTradeKeys(data);
  upbit.tradeList.push(...convertedData);
};

onMounted(() => {
  getTradeAPI();
  upbit.reloadTrade = getTradeAPI;
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

Now, let's get the Trade Socket data that was connected when creating the chart and put it in the TradeList.

<SocketTrade />

::: details Code

```ts
// socket-upbit.ts
state: () ISocketState => ({
  ...
  tradeList: ISocketTradeResponse[];
})

actions:{
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

      this.tradeList.unshift(r);

      if (this.tradeList.length > 50) {
        this.tradeList.pop();
      }
    };
  },
}

```

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
        <li v-for="(data, i) in upbit.tradeList" :key="i" class="trade-info">
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
import { convertTradeKeys, debounce } from "src/utils/rule";

const upbit = useUpbitSocketStore();
const btnSelect = ref(0);

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${
      upbit.selectCoin
    }&count=20&${
      upbit.tradeList.at(-1) ? `${"cursor=" + upbit.tradeList.at(-1).sid}` : ""
    }`
  );

  const data = res.data as ITradeResponse[];
  const convertedData = convertTradeKeys(data);
  upbit.tradeList.push(...convertedData);
};

const scrolling = debounce((a: any) => {
  const percent = Math.floor(
    (a.target.scrollTop / (a.target.scrollHeight - a.target.clientHeight)) * 100
  );

  if (percent > 90) {
    getTradeAPI();
  }
});

onMounted(() => {
  getTradeAPI();
  upbit.reloadTrade = getTradeAPI;
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

The infinite scroll function has been added, but since the condition to call the API is when the scroll percentage is over 90%, you need to change the condition or set a limit on the number.

Also, if you keep adding data, browser lag may occur, so when socket data is added, the last data in tradeList should be removed.

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
