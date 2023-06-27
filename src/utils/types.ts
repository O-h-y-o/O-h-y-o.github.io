export interface ITradeResponse {
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

export interface ISocketTradeResponse {
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
