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
    let timeoutId = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'SUBSCRIBE') {
            if (timeoutId) clearTimeout(timeoutId);

            const sendUpdate = () => {
                const update = {
                    symbol: data.symbol,
                    price: (Number(data.price) + (Math.random() - 0.5) * 2).toFixed(2),
                    change: (Math.random() * 2 - 1).toFixed(2),
                    timestamp: new Date().toLocaleTimeString([], { hour12: false })
                };

                if (ws.readyState === 1) {
                    ws.send(JSON.stringify(update));
                    const nextTick = Math.floor(Math.random() * (2000 - 100) + 100);
                    timeoutId = setTimeout(sendUpdate, nextTick);
                }
            };

            sendUpdate();
        }
    });

    ws.on('close', () => {
        if (timeoutId) clearTimeout(timeoutId);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Market Data API and WebSockets running on http://localhost:${PORT}`);
});