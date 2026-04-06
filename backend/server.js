const express = require('express');
const cors = require('cors');
const { tickers } = require('./Data/MockData');

const app = express();
app.use(cors());

app.get('/api/tickers', (req, res) => {
  res.json(tickers);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Market Data API running on http://localhost:${PORT}`);
});