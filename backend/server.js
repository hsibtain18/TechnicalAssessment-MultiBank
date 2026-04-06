const express = require('express');
const cors = require('cors');
const { tickers } = require('./Data/MockData');
const tickerRoutes = require('./routes/tickerRoutes');
const app = express();
app.use(cors());
app.use('/api/tickers', tickerRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Market Data API running on http://localhost:${PORT}`);
});