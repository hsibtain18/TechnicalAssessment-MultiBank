const BASE_URL = 'http://localhost:4000/api';

export const apiService = {
    async getAllTickers() {
        const res = await fetch(`${BASE_URL}/tickers`);
        return res.json();
    },
    async getTickerHistory(symbol: string) {
        const res = await fetch(`${BASE_URL}/tickers/history/${symbol}`);
        return res.json();
    }
};