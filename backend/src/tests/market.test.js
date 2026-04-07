const request = require('supertest');
const express = require('express');
const tickerRoutes = require('../routes/tickerRoutes');

const app = express();
app.use(express.json());
app.use('/api/tickers', tickerRoutes);

describe('Ticker API Integration Tests', () => {
  
  // Test 1: Get all tickers
  test('GET /api/tickers - Success', async () => {
    const res = await request(app).get('/api/tickers');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Ensure it's pulling from your MockData
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/tickers/history/:symbol - Success', async () => {
    const res = await request(app).get('/api/tickers/history/aapl');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/tickers/history/:symbol - 404 Not Found', async () => {
    const res = await request(app).get('/api/tickers/history/NONEXISTENT');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'History not found');
  });

});