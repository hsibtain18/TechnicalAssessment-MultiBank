import { TickerCard } from './TickerCard';

export const TickerList = ({ tickers, selectedId, onSelect }: any) => {
  return (
    <div className="flex flex-col h-full space-y-3">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
        Market Assets
      </h2>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scroll-smooth">
        {tickers.map((item: any) => (
          <TickerCard
            key={item.id}
            ticker={item}
            isActive={selectedId === item.id}
            onSelect={() => onSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};