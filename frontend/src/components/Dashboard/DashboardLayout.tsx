import React, { useState, useEffect, useMemo } from 'react';
import LineCharts from '../Charts/LineCharts';
import { TickerList } from './TickerList';
import type { Ticker, TickerHistory } from '../../types/market.types';
import { apiService } from '../../services/api.service';

const Dashboard = () => {
    // Define state with your interfaces
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [activeTicker, setActiveTicker] = useState<Ticker | null>(null);
    const [history, setHistory] = useState<TickerHistory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');

        socket.onmessage = (event) => {
            const update = JSON.parse(event.data);

            // Use functional update to check against the CURRENTLY selected ticker
            setActiveTicker((current) => {
                // 1. Filter: If update is for a different ticker, ignore it
                if (current && current.symbol === update.symbol) {

                    // 2. Append Logic: Create new point and update history state
                    const newPoint = {
                        time: update.timestamp,
                        price: Number(update.price)
                    };

                    setHistory((prev) => {
                        const updated = [...prev, newPoint];
                        return updated.slice(-50); // Keep only last 50 points for performance
                    });

                    // 3. Update the Header/Price Display
                    return {
                        ...current,
                        price: Number(update.price),
                        change: Number(update.change)
                    };
                }
                return current;
            });
        };

        return () => socket.close();
    }, []);
    useEffect(() => {
        apiService.getAllTickers().then((data: Ticker[]) => {
            setTickers(data);
            if (data.length > 0) setActiveTicker(data[0]);
        });
    }, []); // Fetch tickers on mount

    useEffect(() => {
        if (activeTicker?.symbol) {
            apiService.getTickerHistory(activeTicker.symbol).then((data: TickerHistory[]) => {
                setHistory(data);
            });
        }
    }, [activeTicker?.symbol]); // Fetch history when active ticker changes afeter we have the symbol

    // Search Filter
    const filteredTickers = useMemo(() => {
        return tickers.filter(t =>
            t.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tickers, searchTerm]);


    if (!activeTicker) {
        return <div className="h-screen flex items-center justify-center">Loading Market Data...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12 text-slate-900">
            <div className="max-w-7xl mx-auto flex flex-col h-[85vh]">

                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black tracking-tight uppercase">
                        Trading<span className="text-blue-600">Dash</span>
                    </h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
                    <aside className="w-full lg:w-80 flex flex-col min-h-0">
                        <input
                            type="text"
                            placeholder="Search 50+ assets..."
                            className="w-full p-3 mb-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <TickerList
                            tickers={filteredTickers}
                            selectedId={activeTicker.id}
                            onSelect={setActiveTicker}
                        />
                    </aside>

                    <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-end">
                            <div>
                                {/* TS now knows activeTicker has 'symbol' and 'name' */}
                                <h2 className="text-5xl font-black leading-none">{activeTicker.symbol}</h2>
                                <p className="text-slate-400 mt-2 font-medium">{activeTicker.name}</p>
                            </div>
                            <div className="text-right">
                                {/* TS now knows 'price' exists and is a number */}
                                <p className="text-4xl font-mono font-bold tracking-tighter">
                                    ${activeTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                                <p className={`text-sm font-bold mt-1 ${activeTicker.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {activeTicker.change >= 0 ? '+' : ''}{activeTicker.change}%
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 p-6">
                            <LineCharts ticker={{ ...activeTicker, history }} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;