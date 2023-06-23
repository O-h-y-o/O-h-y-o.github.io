export {};

declare global {
  interface ISocketState {
    chartTime: string;
    coinFullName: { ko: string; en: string };
    selectCoin: string;
    tradeData: ISocketTradeResponse;
  }

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
