import express from 'express';
import cors from 'cors';
import http from 'http';
import { initWebSocket } from './src/sockets/socketManager.js';
import tickerRoutes from './src/routes/tickerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tickers', tickerRoutes);

const server = http.createServer(app);
initWebSocket(server);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server unified on http://localhost:${PORT}`);
});