const generatePriceUpdate = (currentTicker) => {
  const move = (Math.random() - 0.5) * 2;
  return {
    symbol: currentTicker.symbol,
    price: (Number(currentTicker.price) + move).toFixed(2),
    change: move.toFixed(2),
    timestamp: new Date().toLocaleTimeString([], { hour12: false })
  };
};

const getRandomDelay = () => Math.floor(Math.random() * (2000 - 100) + 100);

module.exports = { generatePriceUpdate, getRandomDelay };