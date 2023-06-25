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
          <!-- <div
            class="ask-bid-control"
            :class="data['pbc']"
            v-if="lazyLoading"
          ></div> -->
          <strong :class="data.change">
            {{ data.trade_price }}
          </strong>
        </div>
        <div class="signed-change-wrap">
          <span class="coin-info" :class="data.change">
            {{ data.signed_change_rate }}%
          </span>
          <span class="coin-market" :class="data.change">
            {{ data.signed_change_price }}
          </span>
        </div>
        <div class="acc-trade-price24">
          <span class="coin-info"> {{ data.atpc24 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { objSort } from "../../utils/rule";

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

const selectCoin = ref("KRW-BTC");
const selectMarket = ref("KRW");
const coinFullName = ref({ ko: "비트코인", en: "Bitcoin" });

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
    sortTarget: "trp",
  },
  {
    text: "전일대비",
    sortTarget: "signed_change_rate",
  },
  {
    text: "거래대금",
    sortTarget: "atp24",
  },
];

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
  selectCoin.value = market;
  coinFullName.value.ko = name;
};

onMounted(async () => {
  await getMarketAPI();
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

    /* &.ask {
      &::before {
        border-bottom-color: #0178e7;
      }
    }

    &.desc {
      &::after {
        border-top-color: #0178e7;
      }
    } */
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
  .coin-wrap {
    .coin-area {
      &.selected {
        background-color: #000;
      }

      &:hover {
        background-color: #222;
      }
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
