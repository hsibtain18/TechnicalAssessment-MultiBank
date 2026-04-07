import { WebSocketServer } from 'ws';
import { generatePriceUpdate, getRandomDelay } from '../services/tickerService.js';

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    let timeoutId = null;
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'SUBSCRIBE') {
        if (timeoutId) clearTimeout(timeoutId);
        const sendUpdate = () => {
          const update = generatePriceUpdate(data);
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(update));
            timeoutId = setTimeout(sendUpdate, getRandomDelay());
          }
        };
        sendUpdate();
      }
    });

    ws.on('close', () => timeoutId && clearTimeout(timeoutId));
  });

  return wss;
};