import React, { useState, useEffect, useMemo } from 'react';
import LineCharts from '../Charts/LineCharts';
import { TickerList } from './TickerList';
import type { Ticker } from '../../types/market.types';
import { apiService } from '../../services/api.service';
import { useTickerData } from '../../hooks/useTickerData';

const Dashboard = () => {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);


    const handleTickerUpdate = (updatedData: any) => {
        setTickers((currentTickers) =>
            currentTickers.map((t) =>
                t.symbol === updatedData.symbol
                    ? { ...t, price: updatedData.price, change: updatedData.change }
                    : t
            )
        );
    };

    const { liveTicker, history } = useTickerData(selectedTicker, handleTickerUpdate);
    useEffect(() => {
        apiService.getAllTickers().then((data: Ticker[]) => {
            setTickers(data);
            if (data.length > 0) setSelectedTicker(data[0]);
        });
    }, []);

    const filteredTickers = useMemo(() => {
        return tickers.filter(t =>
            t.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tickers, searchTerm]);

    if (!liveTicker) {
        return (
            <div className="h-screen flex items-center justify-center font-bold text-slate-400">
                Loading Market Data...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-8 lg:p-12 text-slate-900">
            <div className="max-w-7xl mx-auto flex flex-col h-auto lg:h-[85vh]">

                <header className="flex items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                        Trading<span className="text-blue-600">Dash</span>
                    </h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 min-h-0">

                    <aside className="w-full lg:w-80 flex flex-col min-h-0">
                        <input
                            type="text"
                            placeholder="Search 50+ assets..."
                            className="w-full p-3 mb-3 md:mb-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <TickerList
                            tickers={filteredTickers}
                            selectedId={liveTicker.id}
                            onSelect={setSelectedTicker}
                        />
                    </aside>

                    <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

                        <div className="p-4 sm:p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">

                            <div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none">
                                    {liveTicker.symbol}
                                </h2>
                                <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base font-medium">
                                    {liveTicker.name}
                                </p>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tighter">
                                    ${liveTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                                <p className={`text-sm font-bold mt-1 ${liveTicker.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {liveTicker.change >= 0 ? '+' : ''}{liveTicker.change}%
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 p-3 sm:p-4 md:p-6 min-h-[250px]">
                            <LineCharts ticker={liveTicker} history={history} />
                        </div>

                    </main>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;