const express = require('express');
const cors = require('cors');
const http = require('http'); // 1. Import the native http module
const { WebSocketServer } = require('ws');
const { tickers } = require('./Data/MockData');
const tickerRoutes = require('./routes/tickerRoutes');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use('/api/tickers', tickerRoutes);

wss.on('connection', (ws) => {
  console.log('Client connected for live updates');

  const interval = setInterval(() => {
    const ticker = tickers[Math.floor(Math.random() * tickers.length)];

    const update = {
      symbol: ticker.symbol,
      price: (ticker.price + (Math.random() - 0.5) * 2).toFixed(2),
      change: (Math.random() * 2 - 1).toFixed(2),
      timestamp: new Date().toLocaleTimeString()
    };

    if (ws.readyState === 1) {
      ws.send(JSON.stringify(update));
    }
  }, 2000);

  ws.on('close', () => clearInterval(interval));
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Market Data API and WebSockets running on http://localhost:${PORT}`);
});