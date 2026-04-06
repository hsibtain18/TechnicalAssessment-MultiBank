//  mock data for tickers and their price history
// will replace it with real API data in future iterations
export const tickerData = [
  { 
    id: 1, 
    symbol: "BTC", 
    name: "Bitcoin", 
    price: 64250.50, 
    change: 1.2,
    history: [
      { time: "09:00", price: 63800 },
      { time: "10:00", price: 64100 },
      { time: "11:00", price: 63950 },
      { time: "12:00", price: 64250 },
      { time: "13:00", price: 64150 },
      { time: "14:00", price: 64250.50 }
    ]
  },
  { 
    id: 2, 
    symbol: "ETH", 
    name: "Ethereum", 
    price: 3450.25, 
    change: -0.5,
    history: [
      { time: "09:00", price: 3500 },
      { time: "10:00", price: 3480 },
      { time: "11:00", price: 3460 },
      { time: "12:00", price: 3470 },
      { time: "13:00", price: 3440 },
      { time: "14:00", price: 3450.25 }
    ]
  },
  { 
    id: 3, 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 175.30, 
    change: 0.8,
    history: [
      { time: "09:00", price: 173.50 },
      { time: "10:00", price: 174.10 },
      { time: "11:00", price: 174.80 },
      { time: "12:00", price: 175.00 },
      { time: "13:00", price: 175.10 },
      { time: "14:00", price: 175.30 }
    ]
  },
  {
    id: 4,
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 180.10,
    change: -2.1,
    history: [
      { time: "09:00", price: 185.00 },
      { time: "10:00", price: 183.20 },
      { time: "11:00", price: 182.50 },
      { time: "12:00", price: 181.00 },
      { time: "13:00", price: 180.50 },
      { time: "14:00", price: 180.10 }
    ]
  }
];