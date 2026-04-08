const BASE_URL = 'http://localhost:4000/api';

export const apiService = {
    async getAllTickers() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/tickers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : (data.data || []);
    },

    async getTickerHistory(symbol: string) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/tickers/${symbol}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) return [];
        return res.json();
    }
};