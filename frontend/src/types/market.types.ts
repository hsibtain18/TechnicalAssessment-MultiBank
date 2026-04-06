export interface Ticker {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  timestamp?: string; // Optional for REST, required for WS updates
}

export interface TickerHistory {
  time: string;
  price: number;
}