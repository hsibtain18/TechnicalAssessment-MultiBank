const symbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "BRK.B", "V", "JNJ",
  "WMT", "JPM", "MA", "PG", "UNH", "HD", "DIS", "PYPL", "BAC", "VZ",
  "ADBE", "CMCSA", "NFLX", "INTC", "T", "PFE", "KO", "PEP", "ABT", "ORCL",
  "CSCO", "CRM", "XOM", "CVX", "NKE", "MRK", "ABBV", "COST", "MCD", "TMO",
  "MDT", "WFC", "LLY", "ACN", "DHR", "NEE", "LIN", "AVGO", "TXN", "HON"
];

const tickers = symbols.map((symbol, index) => ({
  id: index + 1,
  symbol,
  name: `${symbol} Corporation`,
  price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
  change: parseFloat((Math.random() * 10 - 5).toFixed(2))
}));

// Generate 24 hours of history for each ticker
const tickerHistory = symbols.reduce((acc, symbol) => {
  const basePrice = tickers.find(t => t.symbol === symbol).price;
  acc[symbol] = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: parseFloat((basePrice + (Math.random() - 0.5) * 20).toFixed(2))
  }));
  return acc;
}, {});

module.exports = { tickers, tickerHistory };