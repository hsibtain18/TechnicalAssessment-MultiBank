import React, { useState } from 'react';
import LineCharts from '../Charts/LineCharts';
import { tickerData } from '../../Data/mockData';
import { TickerList } from './TickerList';

const Dashboard = () => {
  const [tickers] = useState(tickerData);
  const [activeTicker, setActiveTicker] = useState(tickers[0]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12 text-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col h-[85vh]">
        
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Trading<span className="text-blue-600">Dash</span>
          </h1>
          <span className="px-3 py-1 text-[10px] font-bold bg-slate-200 text-slate-500 rounded-full uppercase tracking-wider">
            Static View 
            {/* Placeholder for last udpated time  */}
          </span>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
          <aside className="w-full lg:w-80 flex flex-col min-h-0">
            {/* Ticker List Filter needs to be added  */}
            <TickerList 
              tickers={tickers} 
              selectedId={activeTicker.id} 
              onSelect={setActiveTicker} 
            />
          </aside>

          <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-black leading-none">{activeTicker.symbol}</h2>
                <p className="text-slate-400 mt-2 font-medium">{activeTicker.name}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-mono font-bold tracking-tighter">
                  ${activeTicker.price.toLocaleString()}
                </p>
                <p className={`text-sm font-bold mt-1 ${activeTicker.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {activeTicker.change >= 0 ? '+' : ''}{activeTicker.change}%
                </p>
              </div>
            </div>

            <div className="flex-1 p-6">
                {/* for now just one charts might add a toggle for bar charts  */}
               <LineCharts  ticker={activeTicker} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;