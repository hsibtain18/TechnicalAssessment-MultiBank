import React from 'react';

interface TickerProps {
  ticker: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  };
  isActive: boolean;
  onSelect: () => void;
}

export const TickerCard = ({ ticker, isActive, onSelect }: TickerProps) => {
  const isPositive = ticker.change >= 0;

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isActive 
          ? 'bg-blue-600 border-blue-600 shadow-md' 
          : 'bg-white border-slate-200 hover:border-blue-300'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-bold uppercase ${isActive ? 'text-white' : 'text-slate-900'}`}>
            {ticker.symbol}
          </p>
          <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
            {ticker.name}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-mono font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
            ${ticker.price.toLocaleString()}
          </p>
          <p className={`text-xs font-semibold ${
            isActive ? 'text-blue-100' : (isPositive ? 'text-green-600' : 'text-red-600')
          }`}>
            {isPositive ? '+' : ''}{ticker.change}%
          </p>
        </div>
      </div>
    </button>
  );
};