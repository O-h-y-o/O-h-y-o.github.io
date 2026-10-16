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
              { box: data.ap === tradeData.tp },
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
              { box: data.bp === tradeData.tp },
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
          <li v-for="data in tradeList" :key="data.sid">
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
                {{ selectCoin.split("-")[1] }}
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
      <button type="button">수량({{ selectCoin }})</button>
      <span>{{ orderbookList.tbs?.toFixed(3) }}</span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import EchartsDefault from "./EchartsDefault.vue";
import { ref, computed, onMounted } from "vue";

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

const selectCoin = "KRW-BTC";
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
const tickerData = ref<ITickerResponse>({} as ITickerResponse);
const tradeData = ref<ISocketTradeResponse>({} as ISocketTradeResponse);
const tradeList = ref<ISocketTradeResponse[]>([] as ISocketTradeResponse[]);

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
        { type: "orderbook", codes: [selectCoin] },
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

const connectTickerSocket = () => {
  let tickerSocket: WebSocket;

  tickerSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

  tickerSocket.onopen = (e: any) => {
    tickerSocket.send(
      `${JSON.stringify([
        { ticket: "ticker" },
        { type: "ticker", codes: [selectCoin] },
        { format: "SIMPLE" },
      ])}`
    );
  };

  tickerSocket.onmessage = async (payload: any) => {
    const res = (await new Response(payload.data).json()) as ITickerResponse;

    tickerData.value = res;
  };
};

const connectTradeSocket = () => {
  let tradeSocket: WebSocket;
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
    const r = (await new Response(payload.data).json()) as ISocketTradeResponse;

    tradeData.value = r;

    tradeList.value.unshift(r);

    if (tradeList.value.length > 50) {
      tradeList.value.pop();
    }
  };
};

onMounted(() => {
  setScroll();
  connectOrderbookSocket();
  connectTickerSocket();
  connectTradeSocket();
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
