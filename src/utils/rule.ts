import { ITradeResponse } from "src/utils/types";

export const comma = (change: number | string, digit = 2): string => {
  return Number(change).toLocaleString(undefined, {
    maximumFractionDigits: digit,
  });
};

export const colors = {
  up: "#D24F45",
  down: "#1261C4",
  same: "#000",
};

export const objSort = (data: any, target: any, sort?: string) => {
  const changeObj: any = {};
  if (sort === "desc") {
    new Map(
      Object.entries(data).sort((a: any, b: any): any => {
        return a[1][target] < b[1][target]
          ? 1
          : a[1][target] > b[1][target]
          ? -1
          : 0;
      })
    ).forEach((v: any, k: any) => {
      changeObj[k] = v;
    });
  } else {
    new Map(
      Object.entries(data).sort((a: any, b: any): any => {
        return a[1][target] > b[1][target]
          ? 1
          : a[1][target] < b[1][target]
          ? -1
          : 0;
      })
    ).forEach((v: any, k: any) => {
      changeObj[k] = v;
    });
  }
  return changeObj;
};

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

export const debounce = (callback: Function, limit = 100) => {
  let timeout: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
};
