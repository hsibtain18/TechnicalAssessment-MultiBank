import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';
import type { Ticker, TickerHistory } from '../types/market.types';

export const useTickerData = (
    initialTicker: Ticker | null, 
    onUpdate?: (updatedTicker: any) => void  
) => {
    const [liveTicker, setLiveTicker] = useState<Ticker | null>(initialTicker);
    const [history, setHistory] = useState<TickerHistory[]>([]);

    useEffect(() => {
        if (!initialTicker?.symbol) return;

        setLiveTicker(initialTicker);
        apiService.getTickerHistory(initialTicker.symbol).then(setHistory);

        const socket = new WebSocket('ws://127.0.0.1:4000');

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'SUBSCRIBE',
                symbol: initialTicker.symbol,
                price: initialTicker.price
            }));
        };

        socket.onmessage = (event) => {
            const update = JSON.parse(event.data);
            
            const updatedData = {
                symbol: update.symbol,
                price: Number(update.price),
                change: Number(update.change),
                timestamp: update.timestamp
            };

            setLiveTicker(prev => prev ? { ...prev, ...updatedData } : null);

            if (onUpdate) onUpdate(updatedData);
            setHistory((prev) => [...prev, {
                time: update.timestamp,
                price: Number(update.price)
            }]);
        };

        return () => { if (socket.readyState === 1) socket.close(); };
    }, [initialTicker?.symbol]);

    return { liveTicker, history };
};