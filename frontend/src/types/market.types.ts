export interface Ticker {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  timestamp?: string; 
}

export interface TickerHistory {
  time: string;
  price: number;
}