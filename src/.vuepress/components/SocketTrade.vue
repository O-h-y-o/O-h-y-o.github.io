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
            {{ Number((data.tp * data.tv).toFixed()).toLocaleString() }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { convertTradeKeys, debounce } from "../../utils/rule";
import dayjs from "dayjs";
import { ISocketTradeResponse, ITradeResponse } from "../../utils/types";

const tradeList = ref<ISocketTradeResponse[]>([]);
const selectCoin = "KRW-BTC";

const getTradeAPI = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/trades/ticks?market=${selectCoin}&count=20`
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
}, 100);

onMounted(() => {
  getTradeAPI();
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

    tradeList.value.unshift(r);

    if (tradeList.value.length > 50) {
      tradeList.value.pop();
    }
  };
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
