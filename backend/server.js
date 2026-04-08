import express from 'express';
import cors from 'cors';
import http from 'http';
import { initWebSocket } from './src/sockets/socketManager.js';
import tickerRoutes from './src/routes/tickerRoutes.js';
import jwt from 'jsonwebtoken';
import { verifyToken, SECRET_KEY } from './src/middleware/auth.js';
const app = express();
app.use(cors());
app.use(express.json());
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid username or password' });
});
app.use('/api', verifyToken);
app.use('/api/tickers', tickerRoutes);

const server = http.createServer(app);
initWebSocket(server);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server unified on http://localhost:${PORT}`);
});