---
order: 5
---

# 업비트 오픈API로 거래소 페이지 만들어보기 - 오더북

::: tip

```ts
// global.d.ts
interface ISocketOrderbookResponse {
  cd: string;
  tms: number;
  tas: number;
  tbs: number;
  obu: [
    {
      ap: number;
      bp: number;
      as: number;
      bs: number;
    }
  ];
  st: string;
  ty: string;
}
```

```ts
const connectOrderbookSocket = () => {
  orderbookSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

  orderbookSocket.onopen = (e: any) => {
    orderbookSocket.send(
      `${JSON.stringify([
        { ticket: "orderbook" },
        { type: "orderbook", codes: [upbit.selectCoin] },
        { format: "SIMPLE" },
      ])}`
    );
  };

  orderbookSocket.onmessage = async (payload: any) => {
    const r = (await new Response(
      payload.data
    ).json()) as ISocketOrderbookResponse;

    orderbookList.value = r;
  };
};
```

:::

<UpbitOrderbook />

::: details Code

```vue
// UpbitOrderbook.vue
<template>
  <div class="orderbook-wrap">
    <div ref="scrollRef" class="orderbook-area">
      <EchartsDefault
        :binding-options="bindingOptions"
        style="width: 100%; height: 1000px"
      />
      <div class="order-price-wrap">
        <ul class="ask">
          <li
            v-for="(data, i) in orderbookAsk?.reverse()"
            :key="i"
            :class="[
              data.per > 0 ? 'color-rise' : 'color-fall',
              { box: data.ap === upbit.tradeData.tp },
            ]"
          >
            <span>
              {{ data.ap.toLocaleString() }}
            </span>
            <span class="per">
              {{ data.per > 0 ? "+" : "" }}{{ data.per.toFixed(2) }}%
            </span>
          </li>
        </ul>
        <ul class="bid">
          <li
            v-for="(data, i) in orderbookBid"
            :key="i"
            :class="[
              data.per > 0 ? 'color-rise' : 'color-fall',
              { box: data.bp === upbit.tradeData.tp },
            ]"
          >
            <span>
              {{ data.bp.toLocaleString() }}
            </span>
            <span class="per">
              {{ data.per > 0 ? "+" : "" }}{{ data.per.toFixed(2) }}%
            </span>
          </li>
        </ul>
      </div>
      <div class="trade-wrap">
        <div class="info">
          <span>체결가</span>
          <span>체결량</span>
        </div>
        <ul class="trade">
          <li v-for="data in upbit.tradeList.slice(0, 20)" :key="data.sid">
            <span class="trade-price">{{ data.tp.toLocaleString() }}</span>
            <span class="trade-volume" :class="data.ab">
              {{ data.tv.toFixed(3) }}
            </span>
          </li>
        </ul>
      </div>

      <div class="coin-info-wrap">
        <ul class="trade-amount-wrap">
          <li>
            <span> 거래량 </span>
            <span>
              {{ Math.round(tickerData.atv24h)?.toLocaleString() }}
              <span style="font-size: 10px; color: #888">
                {{ upbit.selectCoin.split("-")[1] }}
              </span>
            </span>
          </li>
          <li>
            <span> 거래대금 </span>
            <div>
              <span>
                {{
                  tickerData.atp24h &&
                  Number(
                    tickerData.atp24h.toFixed().slice(0, -6)
                  ).toLocaleString()
                }}
                <span style="font-size: 10px; color: #888">백만원</span>
              </span>
              <span>(최근 24시간)</span>
            </div>
          </li>
        </ul>
        <ul class="highest-lowest-wrap">
          <li>
            <span> 52주 최고</span>
            <div>
              <span class="color-rise">
                {{ tickerData.h52wp?.toLocaleString() }}
              </span>
              <span>({{ tickerData.h52wdt }})</span>
            </div>
          </li>
          <li>
            <span> 52주 최저</span>
            <div>
              <span class="color-fall">
                {{ tickerData.l52wp?.toLocaleString() }}
              </span>
              <span> ({{ tickerData.l52wdt }}) </span>
            </div>
          </li>
        </ul>
        <ul class="today-info-wrap">
          <li>
            <span>전일종가</span>
            <span>{{ tickerData.pcp?.toLocaleString() }} </span>
          </li>
          <li>
            <span>당일고가</span>
            <div>
              <span class="color-rise">
                {{ tickerData.hp?.toLocaleString() }}
              </span>
              <em class="color-rise">
                +{{
                  (
                    (tickerData.hp - tickerData.pcp) /
                    (tickerData.pcp / 100)
                  ).toFixed(2)
                }}%
              </em>
            </div>
          </li>
          <li>
            <span>당일저가</span>
            <div>
              <span class="color-fall">
                {{ tickerData.lp?.toLocaleString() }}
              </span>
              <em class="color-fall">
                {{
                  (
                    (tickerData.lp - tickerData.pcp) /
                    (tickerData.pcp / 100)
                  ).toFixed(2)
                }}%
              </em>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <nav class="nav-bottom">
      <span>{{ orderbookList.tas?.toFixed(3) }}</span>
      <button type="button">수량({{ upbit.selectCoin }})</button>
      <span>{{ orderbookList.tbs?.toFixed(3) }}</span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import EchartsDefault from "src/components/EchartsDefault.vue";
import { useUpbitSocketStore } from "src/stores/socket-upbit";

const upbit = useUpbitSocketStore();
const scrollRef = ref();
const orderbookList = ref<ISocketOrderbookResponse>(
  {} as ISocketOrderbookResponse
);
const orderbookAsk = computed(() => {
  return orderbookList.value.obu?.map((e) => ({
    ap: e.ap,
    as: e.as,
    per: (e.ap - tickerData.value.pcp) / (tickerData.value.pcp / 100),
  }));
});
const orderbookBid = computed(() => {
  return orderbookList.value.obu?.map((e) => ({
    bp: e.bp,
    bs: e.bs,
    per: (e.bp - tickerData.value.pcp) / (tickerData.value.pcp / 100),
  }));
});
const tickerData = computed(() => upbit.tickerData);

const bindingOptions = ref({
  xAxis: [
    {
      type: "value",
      inverse: true,
      show: false,
    },
    {
      gridIndex: 1,
      type: "value",
      inverse: false,
      show: false,
    },
  ],
  yAxis: [
    {
      type: "category",
      position: "right",
      show: false,
    },
    {
      gridIndex: 1,
      type: "category",
      position: "left",
      show: false,
    },
  ],
  grid: [
    {
      left: 0,
      right: "68%",
      top: 0,
      height: 500,
    },
    {
      left: "68%",
      right: 0,
      bottom: 0,
      height: 500,
    },
  ],
  series: [
    {
      data: computed(
        () =>
          orderbookAsk.value && orderbookAsk.value.map((e) => e.as.toFixed(3))
      ),
      type: "bar",
      barWidth: "30",
      showBackground: true,
      backgroundStyle: {
        color: "#ECF3FA",
      },
      itemStyle: {
        color: "#CCDDF2",
      },
      label: {
        show: true,
        position: "insideRight",
      },
    },
    {
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: computed(
        () =>
          orderbookBid.value && orderbookBid.value.map((e) => e.bs.toFixed(3))
      ),
      type: "bar",
      barWidth: "30",
      showBackground: true,
      backgroundStyle: {
        color: "#F1EAEB",
      },
      itemStyle: {
        color: "#EAD2CF",
      },
      label: {
        show: true,
        position: "insideLeft",
      },
    },
  ],
});

const setScroll = () => {
  scrollRef.value.scrollTop = 100;
};

let orderbookSocket: WebSocket;

const connectOrderbookSocket = () => {
  orderbookSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

  orderbookSocket.onopen = (e: any) => {
    orderbookSocket.send(
      `${JSON.stringify([
        { ticket: "orderbook" },
        { type: "orderbook", codes: [upbit.selectCoin] },
        { format: "SIMPLE" },
      ])}`
    );
  };

  orderbookSocket.onmessage = async (payload: any) => {
    const r = (await new Response(
      payload.data
    ).json()) as ISocketOrderbookResponse;

    orderbookList.value = r;
  };

  setScroll();
};

const reloadOrderbook = () => {
  orderbookSocket.close();
  connectOrderbookSocket();
};

onMounted(() => {
  connectOrderbookSocket();
  upbit.reloadOrderbook = reloadOrderbook;
});
</script>

<style scoped lang="scss">
.orderbook-wrap {
  min-width: 500px;
  width: 50%;
  margin-right: 10px;

  ul {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
    }
  }
}

.orderbook-area {
  height: 800px;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;
}

.order-price-wrap {
  position: absolute;
  width: calc(36% - 3px);
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 1000px;

  > ul {
    &.ask,
    &.bid {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      > li {
        text-align: center;
        height: 30px;
        line-height: 2;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 5px;
        position: relative;

        &.trade {
          border: 1px solid #000;
        }

        > span {
          width: 50%;
          text-align: right;
          font-size: 11px;
          &.per {
            font-size: 12px;
          }
        }
      }

      .box {
        position: relative;

        &::before {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          box-sizing: border-box;
          top: 0;
          left: 0;
          border: 2px solid #000;
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0px;
          height: 0px;
          margin: auto;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 7px solid #000;
        }
      }
    }

    &.ask {
      > li {
        background-color: #ecf3fa;
      }
    }

    &.bid {
      > li {
        background-color: #f1eaeb;
      }
    }
  }
}

.trade-wrap {
  width: 32%;
  position: absolute;
  left: 0;
  bottom: -202px;
  height: 500px;
  overflow: hidden;

  .info {
    background-color: #f2f2f2;
    height: 30px;

    > span {
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 2.3;
      font-size: 13px;
    }
  }

  .trade {
    padding-right: 2px;
    > li {
      margin-bottom: 3px;
      span {
        display: inline-block;
        text-align: right;
        width: 50%;
        font-size: 11px;
      }
    }
  }
}

.coin-info-wrap {
  width: 32%;
  position: absolute;
  right: 0;
  bottom: 300px;
  font-size: 11px;
  padding: 7px;

  > ul {
    padding-bottom: 16px;

    &:nth-child(2) {
      padding: 0 0 16px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    > li {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;

      > div {
        display: flex;
        flex-direction: column;
        text-align: right;

        > span {
          &:last-child {
            color: #999;
            font-size: 11px;
          }
        }

        > em {
          font-style: normal;
          font-size: 11px;
        }
      }
    }
  }
}

.nav-bottom {
  width: 100%;
  height: 40px;
  display: flex;
  background-color: #f2f2f2;

  > button {
    width: calc(36% - 3px);
    height: 100%;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-left: 1px;
  }

  > span {
    display: inline-block;
    flex: 1;
    height: 100%;
    font-size: 12px;
    line-height: 3.5;

    &:first-child {
      text-align: right;
      padding-right: 10px;
    }

    &:last-child {
      text-align: left;
      padding-left: 10px;
    }
  }
}

.color-rise,
.BID {
  color: #d24f45;
}

.color-fall,
.ASK {
  color: #1261c4;
}
</style>
```

:::

지금까지 만들었던 기능들로 불러오는 데이터들을 가져와 오더북에 최종적으로 연결해주었습니다.

오더북에서 쓰인 차트는 Bar 차트를 위아래로 각 하나씩 만들었습니다.

현재 예시 차트에서는 `UpbitTrade.vue` 에서 getTradeAPI 로 불러온 데이터가 연결되어있지는 않지만 실제 돌아가는 프로세스에서는 잘 연결되어 초기 데이터부터 잘 보일것입니다.

여기까지 업비트 거래소 페이지의 차트, 마켓리스트, 거래체결내역, 오더북을 구현해보았습니다.
전체적으로 세부적인 기능까지는 구현하지는 않고 핵심 기능들만 구현하였습니다.

마지막으로 `MarketList.vue` 의 `changeMarket` 함수를 실행할때 reload를 시켜야하는 함수들을 실행시키는 코드를 추가하며 마무리 하겠습니다.

::: info

```ts
// UpbitTrade.vue
...
const reloadTrade = async () => {
  await getTradeAPI();
  upbit.disconnectTradeSocket();
  upbit.connectTradeSocket();
}

onMounted(async () => {
  ...
  upbit.reloadTrade = reloadTrade;
});
...

```

```ts
// MarketList.vue
const changeMarket = (market: string) => {
  closeTickerSocket();
  selectMarket.value = market;
  controlLoadAll();
  connectTickerSocket(Object.keys(markets.value[market]));
  upbit.reloadCandle();
  upbit.reloadTrade();
  upbit.reloadOrderbook();
  selectSort.value.sortTarget = "";
  selectSort.value.sort = "desc";
  dataSort("trp");
};
```

:::
