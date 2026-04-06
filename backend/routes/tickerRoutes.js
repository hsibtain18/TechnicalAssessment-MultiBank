const express = require('express');
const router = express.Router();
const { tickers, tickerHistory } = require('../Data/MockData');

router.get('/', (req, res) => {
  res.json(tickers);
});

router.get('/history/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const data = tickerHistory[symbol];
  
  if (!data) {
    return res.status(404).json({ error: 'History not found' });
  }
  
  res.json(data);
});
module.exports = router;