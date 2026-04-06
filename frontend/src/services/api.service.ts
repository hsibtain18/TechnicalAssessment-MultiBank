import type { Ticker, TickerHistory } from "../types/market.types";

const BASE_URL = 'http://localhost:4000/api';

class ApiService {

    // 1. Fetch all tickers (Overview)
    async getAllTickers(): Promise<Ticker[]> {
        const response = await fetch(`${BASE_URL}/tickers`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
    // 2. Fetch price history for a specific ticker
    async getTickerHistory(symbol: string): Promise<TickerHistory[]> {
        const response = await fetch(`${BASE_URL}/tickers/history/${symbol}`);
        if (!response.ok) throw new Error('History fetch failed');
        return response.json();
    }
}

export const apiService = new ApiService();