---
order: 3
---

# 업비트 오픈API로 거래소 페이지 만들어보기 - 마켓 리스트

이번에는 원화 마켓 리스트를 만들어 보겠습니다.

업비트 API로 원화 마켓 정보를 먼저 불러오겠습니다.

::: info API Response 예시

```js
// MarketList.vue
const getMarketAPI = async () => {
  const response = await axios.get(
    "https://api.upbit.com/v1/market/all?isDetails=true"
  );
};
```

```json
[
  {
    "market_warning": "NONE",
    "market": "KRW-BTC",
    "korean_name": "비트코인",
    "english_name": "Bitcoin"
  },
  {
    "market_warning": "NONE",
    "market": "KRW-ETH",
    "korean_name": "이더리움",
    "english_name": "Ethereum"
  },
  {
    "market_warning": "NONE",
    "market": "BTC-ETH",
    "korean_name": "이더리움",
    "english_name": "Ethereum"
  }
]
```

:::

<br /> <br/>

불러온 마켓 데이터들을 market 종류별로 정리를 해보겠습니다.

::: tip

Market의 종류에는 KRW(원화), BTC, USDT 세 종류가 있습니다.

:::

::: info Market 별로 정리하기

```ts
//global.d.ts
interface IMarketResponse {
  market: string;
  english_name: string;
  korean_name: string;
  market_warning: string;
  trade_price: string;
  trp: string;
  signed_change_rate: number;
  signed_change_price: string;
  change: string;
  atpc24: string;
  atp24: number;
  pbc: string;
  beforePrice: string;
}

interface IMarkets {
  [key: string]: {
    [key: string]: IMarketResponse;
  };
}
```

```vue
// MarketList.vue
<script setup lang="ts">
import { ref } from "vue";

const markets = ref<IMarkets>({
  KRW: {},
  BTC: {},
  USDT: {},
});

const getMarketAPI = async () => {
  const response = await axios.get<IMarketResponse[]>(
    "https://api.upbit.com/v1/market/all?isDetails=true"
  );

  for (const i in response.data) {
    const data = response.data[i];
    const [baseMarket, targetMarket] = data.market.split("-");

    markets.value[baseMarket][targetMarket] = data;
  }
};
</script>
```

:::

각 마켓별로 데이터들이 정리되는 것을 확인할 수 있습니다.

<br/> <br/>

이제 정리한 데이터들을 화면에 노출하고, 몇 가지 기능들을 구현해보겠습니다.

<MarketList />

::: details Code

```ts
// global.d.ts
interface IMarketResponse {
  market: string;
  english_name: string;
  korean_name: string;
  market_warning: string;
  trade_price: string;
  trp: string;
  signed_change_rate: number;
  signed_change_price: string;
  change: string;
  atpc24: string;
  atp24: number;
  pbc: string;
  beforePrice: string;
}

interface IMarkets {
  [key: string]: {
    [key: string]: IMarketResponse;
  };
}
```

```vue
<template>
  <div class="exchange-nav-wrap">
    <nav>
      <button
        type="button"
        class="market-change-btn"
        v-for="data in marketTab"
        :class="{ active: selectMarket === data.market }"
        @click="changeMarket(data.market)"
        :key="data.market"
      >
        {{ data.text }}
      </button>
    </nav>

    <div class="sort-area">
      <button
        type="button"
        v-for="data in sortTab"
        :key="data.text"
        :class="[
          selectSort.sortTarget === data.sortTarget ? selectSort.sort : '',
        ]"
        @click="[changeSort(data.sortTarget)]"
      >
        {{ data.text }}
      </button>
    </div>

    <div class="coin-wrap">
      <div
        class="coin-area"
        :class="{ selected: data.market === selectCoin }"
        v-for="data in markets[selectMarket]"
        :key="data.korean_name"
        @click="changeCoin(data.market, data.korean_name)"
      >
        <div class="coin-name-wrap">
          <span class="coin-name">{{ data.korean_name }}</span>
          <span class="coin-market">{{ data.market }}</span>
        </div>
        <div class="now-price-wrap">
          <strong :class="data.c">
            {{ data.tp }}
          </strong>
        </div>
        <div class="signed-change-wrap">
          <span class="coin-info" :class="data.c"> {{ data.scr }}% </span>
          <span class="coin-market" :class="data.c">
            {{ data.scp }}
          </span>
        </div>
        <div class="acc-trade-price24">
          <span class="coin-info"> {{ data.atp24h }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";
import { objSort } from "src/utils/rule";

const upbit = useUpbitSocketStore();

const selectMarket = ref("KRW");
const marketTab = ref([
  {
    text: "원화",
    market: "KRW",
  },
  {
    text: "BTC",
    market: "BTC",
  },
  {
    text: "USDT",
    market: "USDT",
  },
]);

const selectSort = ref({ sortTarget: "", sort: "desc" });
const sortTab = [
  {
    text: "한글명",
    sortTarget: "korean_name",
  },
  {
    text: "현재가",
    sortTarget: "tp",
  },
  {
    text: "전일대비",
    sortTarget: "scr",
  },
  {
    text: "거래대금",
    sortTarget: "atp24h",
  },
];

const markets = ref<{ [key: string]: { [key: string]: IMarketResponse } }>({
  KRW: {},
  BTC: {},
  USDT: {},
});

const getMarketAPI = async () => {
  const response = await axios.get<IMarketResponse[]>(
    "https://api.upbit.com/v1/market/all?isDetails=true"
  );

  for (const i in response.data) {
    const data = response.data[i];
    const [baseMarket] = data.market.split("-");

    markets.value[baseMarket][data.market] = data;
  }
};

const dataSort = (sortTarget: string) => {
  markets.value[selectMarket.value] = objSort(
    markets.value[selectMarket.value],
    sortTarget,
    selectSort.value.sort
  );
};

const changeSort = (sortTarget: string) => {
  if (selectSort.value.sortTarget === sortTarget) {
    selectSort.value.sort = selectSort.value.sort === "ask" ? "desc" : "ask";
  } else {
    selectSort.value.sort = "ask";
  }
  selectSort.value.sortTarget = sortTarget;

  dataSort(sortTarget);
};

const changeMarket = (market: string) => {
  selectMarket.value = market;
  selectSort.value.sortTarget = "";
  selectSort.value.sort = "desc";
  dataSort("trp");
};

const changeCoin = (market: string, name: string) => {
  upbit.selectCoin = market;
  upbit.coinFullName.ko = name;
};

onMounted(() => {
  getMarketAPI();
});
</script>

<style scoped lang="scss">
.exchange-nav-wrap {
  position: relative;
  max-width: 400px;
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .market-change-btn {
    padding: 10px;
    height: 100%;
    width: 50%;
    border-bottom: 1px solid #eee;
    transition: 0.3s ease;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &.active {
      border-bottom: 1px solid #1890ff;
      color: #1890ff;
      pointer-events: none;
    }
  }
}

.sort-area {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #eee;

  > button {
    width: 100%;
    font-size: 11px;
    position: relative;
    padding: 0.5rem 0;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &::before {
      content: "";
      position: absolute;
      top: 5px;
      right: 5px;
      border-top: none;
      border-bottom: 8px solid #ddd;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 5px;
      right: 5px;
      border-top: 8px solid #ddd;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }
  }
}

.coin-wrap {
  height: 500px;
  overflow-x: hidden;
  padding-right: 2px;

  .coin-area {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 3px;
    cursor: pointer;

    &.selected {
      background-color: rgb(221, 221, 221);
      transition: 0.2s ease;
      pointer-events: none;
    }

    > div {
      width: 25%;
      padding: 3px;
    }

    &:hover {
      background-color: #eee;
      transition: 0.2s ease;
    }
  }
}

.coin-name-wrap {
  display: flex;
  flex-direction: column;
}

.coin-name {
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.coin-info {
  font-size: 12px;
}

.coin-market {
  font-size: 10px;
  color: #999;
}

.now-price-wrap,
.signed-change-wrap,
.acc-trade-price24 {
  text-align: right;
  display: flex;
  flex-direction: column;
  position: relative;
}

.now-price-wrap {
  strong {
    font-size: 13px;
    line-height: 2;
  }
}

html[data-theme="dark"] {
  .coin-area {
    &.selected {
      background-color: #000;
    }

    &:hover {
      background-color: #222;
    }
  }

  .sort-area,
  .coin-area {
    border-bottom: 1px solid #555;
  }

  .coin-name {
    color: #eee;
  }
}
</style>
```

:::

1. 원화, BTC, USDT 마켓 별로 정리한 데이터들을 바인딩하였습니다.
2. 한글명, 현재가, 전일대비, 거래대금 별로 정렬 기능을 구현하였습니다.
3. 각 리스트를 선택하면 upbit-store.ts 의 selectCoin을 변경하여 전역적으로 코인을 변경 하였습니다.
4. 다크모드를 구현하였습니다. (프로젝트 설정상 UI가 다를 수 있습니다.)

<br/>

아직 현재가, 전일대비, 거래대금에 대한 데이터가 없으므로 Ticker Socket 으로 실시간 마켓 거래현황을 가져와 마무리 지어보겠습니다.

<SocketMarket />

::: details Code

```ts
interface ITickerResponse {
  dd: null;
  its: false;
  aav: number;
  abv: number;
  atp: number;
  atp24h: number;
  atv: number;
  atv24h: number;
  cp: number;
  cr: number;
  h52wp: number;
  hp: number;
  l52wp: number;
  lp: number;
  op: number;
  pcp: number;
  scp: number;
  scr: number;
  tms: number;
  tp: number;
  ttms: number;
  tv: number;
  ab: string;
  c: string;
  cd: string;
  h52wdt: string;
  l52wdt: string;
  ms: string;
  mw: string;
  st: string;
  tdt: string;
  ttm: string;
  ty: string;
}

interface IMarketResponse {
  market: string;
  english_name: string;
  korean_name: string;
  market_warning: string;
  trade_price: string;
  trp: string;
  signed_change_rate: number;
  signed_change_price: string;
  change: string;
  atpc24: string;
  atp24: number;
  pbc: string;
  beforePrice: string;
}

type BoxControl = { box?: boolean; control: Function };

interface IMarkets {
  [key: string]: {
    [key: string]: IMarketResponse & ITickerResponse & BoxControl;
  };
}
```

```vue
<template>
  <div class="exchange-nav-wrap">
    <nav>
      <button
        type="button"
        class="market-change-btn"
        v-for="(data, i) in marketTab"
        :class="{ active: selectMarket === data.market }"
        @click="changeMarket(data.market)"
        :key="i"
        :disabled="loadAll"
      >
        {{ data.text }}
      </button>
    </nav>

    <div class="sort-area">
      <button
        type="button"
        v-for="data in sortTab"
        :key="data.text"
        :class="[
          selectSort.sortTarget === data.sortTarget ? selectSort.sort : '',
        ]"
        @click="[changeSort(data.sortTarget)]"
      >
        {{ data.text }}
      </button>
    </div>

    <div class="coin-wrap">
      <div
        class="coin-area"
        :class="{ selected: data.market === upbit.selectCoin }"
        v-for="data in markets[selectMarket]"
        :key="data.korean_name"
        @click="changeCoin(data.market, data.korean_name)"
      >
        <div class="coin-name-wrap">
          <span class="coin-name">{{ data.korean_name }}</span>
          <span class="coin-market">{{ data.market }}</span>
        </div>
        <div class="now-price-wrap">
          <div class="ask-bid-control" :class="data.ab" v-if="data.box"></div>
          <strong :class="data.c">
            {{ data.tp && data.tp.toLocaleString() }}
          </strong>
        </div>
        <div class="signed-change-wrap">
          <span class="coin-info" :class="data.c">
            {{ data.scr && (data.scr * 100).toFixed(2) }}%
          </span>
          <span class="coin-market" :class="data.c">
            {{ data.scp && data.scp.toLocaleString() }}
          </span>
        </div>
        <div class="acc-trade-price24">
          <span class="coin-info">
            {{
              data.atp24h &&
              Number(data.atp24h.toFixed().slice(0, -6))
                .toLocaleString()
                .concat(" 백만")
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";
import { objSort } from "src/utils/rule";

const upbit = useUpbitSocketStore();

const selectMarket = ref("KRW");
const marketTab = ref([
  {
    text: "원화",
    market: "KRW",
  },
  {
    text: "BTC",
    market: "BTC",
  },
  {
    text: "USDT",
    market: "USDT",
  },
]);

const selectSort = ref({ sortTarget: "", sort: "desc" });
const sortTab = [
  {
    text: "한글명",
    sortTarget: "korean_name",
  },
  {
    text: "현재가",
    sortTarget: "tp",
  },
  {
    text: "전일대비",
    sortTarget: "scr",
  },
  {
    text: "거래대금",
    sortTarget: "atp24h",
  },
];

const markets = ref<IMarkets>({
  KRW: {},
  BTC: {},
  USDT: {},
});

const loadAll = ref(false);

const controlLoadAll = () => {
  loadAll.value = true;

  setTimeout(() => {
    loadAll.value = false;
  }, 1000);
};

const getMarketAPI = async () => {
  const response = await axios.get<IMarketResponse[]>(
    "https://api.upbit.com/v1/market/all?isDetails=true"
  );

  for (const i in response.data) {
    const data = response.data[i] as IMarketResponse & ITickerResponse;
    const [baseMarket] = data.market.split("-");

    markets.value[baseMarket][data.market] = {
      ...data,
      control() {
        this.box = true;
        setTimeout(() => {
          this.box = false;
        }, 500);
      },
    };
  }
};

const dataSort = (sortTarget: string) => {
  markets.value[selectMarket.value] = objSort(
    markets.value[selectMarket.value],
    sortTarget,
    selectSort.value.sort
  );
};

const changeSort = (sortTarget: string) => {
  if (selectSort.value.sortTarget === sortTarget) {
    selectSort.value.sort = selectSort.value.sort === "ask" ? "desc" : "ask";
  } else {
    selectSort.value.sort = "ask";
  }
  selectSort.value.sortTarget = sortTarget;

  dataSort(sortTarget);
};

const changeMarket = (market: string) => {
  closeTickerSocket();
  selectMarket.value = market;
  controlLoadAll();
  connectTickerSocket(Object.keys(markets.value[market]));
  selectSort.value.sortTarget = "";
  selectSort.value.sort = "desc";
  dataSort("trp");
};

const changeCoin = (market: string, name: string) => {
  upbit.selectCoin = market;
  upbit.coinFullName.ko = name;
  upbit.reloadCandle();
};

let tickerSocket: WebSocket;

const connectTickerSocket = (codes: string[]) => {
  tickerSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

  tickerSocket.onopen = (e: any) => {
    tickerSocket.send(
      `${JSON.stringify([
        { ticket: "ticker" },
        { type: "ticker", codes: codes },
        { format: "SIMPLE" },
      ])}`
    );
  };

  tickerSocket.onmessage = async (payload: any) => {
    const res = (await new Response(payload.data).json()) as ITickerResponse;

    const [baseMarket] = res.cd.split("-");

    markets.value[baseMarket][res.cd] = {
      ...markets.value[baseMarket][res.cd],
      ...res,
    };

    if (loadAll.value) {
      return;
    }

    markets.value[baseMarket][res.cd].control();
  };
};

const closeTickerSocket = () => {
  tickerSocket.close();
};

onMounted(async () => {
  await getMarketAPI();
  connectTickerSocket(Object.keys(markets.value[selectMarket.value]));
});
</script>

<style scoped lang="scss">
.exchange-nav-wrap {
  position: relative;
  max-width: 400px;
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .market-change-btn {
    padding: 10px;
    height: 100%;
    width: 50%;
    border-bottom: 1px solid #eee;
    transition: 0.3s ease;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &.active {
      border-bottom: 1px solid #1890ff;
      color: #1890ff;
      pointer-events: none;
    }
  }
}

.sort-area {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #eee;

  > button {
    width: 100%;
    font-size: 11px;
    position: relative;
    padding: 0.5rem 0;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &::before {
      content: "";
      position: absolute;
      top: 5px;
      right: 5px;
      border-top: none;
      border-bottom: 8px solid #ddd;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 5px;
      right: 5px;
      border-top: 8px solid #ddd;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }

    &.ask {
      &::before {
        border-bottom-color: #0178e7;
      }
    }

    &.desc {
      &::after {
        border-top-color: #0178e7;
      }
    }
  }
}

.coin-wrap {
  height: 500px;
  overflow-x: hidden;
  padding-right: 2px;

  .coin-area {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 3px;
    cursor: pointer;

    &.selected {
      background-color: rgb(221, 221, 221);
      transition: 0.2s ease;
      pointer-events: none;
    }

    > div {
      width: 25%;
      padding: 3px;
    }

    &:hover {
      background-color: #eee;
      transition: 0.2s ease;
    }
  }
}

.coin-name-wrap {
  display: flex;
  flex-direction: column;
}

.coin-name {
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.coin-info {
  font-size: 12px;
}

.coin-market {
  font-size: 10px;
  color: #999;
}

.now-price-wrap,
.signed-change-wrap,
.acc-trade-price24 {
  text-align: right;
  display: flex;
  flex-direction: column;
  position: relative;
}

.now-price-wrap {
  strong {
    font-size: 13px;
    line-height: 2;
  }
}

.ask-bid-control {
  position: absolute;
  width: 90%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  &.ASK {
    border: 1px solid #1261c4;
  }
  &.BID {
    border: 1px solid #d24f45;
  }
}

.RISE {
  color: #d24f45;
}

.FALL {
  color: #1261c4;
}

.dark {
  .coin-area {
    &.selected {
      background-color: #000;
    }

    &:hover {
      background-color: #000;
    }
  }

  .sort-area,
  .coin-area {
    border-bottom: 1px solid #555;
  }
}
</style>
```

:::

1. 소켓 데이터로 현재가, 전일대비, 거래대금에 데이터를 바인딩하였습니다.
2. 마켓 변경시 기존 소켓 연결 해지 및 변경한 마켓으로 새롭게 소켓 연결 하였습니다.
3. 매수/매도 가 일어날 때 현재가에 매수/매도 Box를 나타내주었습니다.

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const res = ref([]);

const getMarketAPI = async () => {
  const response = await axios.get(
    "https://api.upbit.com/v1/market/all?isDetails=true"
  );

  res.value = response.data;
};

onBeforeMount(() => {
  getMarketAPI();
})
</script>
