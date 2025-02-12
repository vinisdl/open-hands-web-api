import express from 'express';
import cors from 'cors';
import { executeAction } from './lib/wsClient.js';
import swaggerUi from 'swagger-ui-express';

import { readFileSync } from 'fs';
import openhandsController from './controllers/openhandsController.js';
const swaggerDocument = JSON.parse(readFileSync(new URL('../swagger.json', import.meta.url), 'utf8'));

const app = express();

app.use(cors());
app.get('/openapi.json', (req, res) => { res.json(swaggerDocument); });
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("X-Frame-Options", "ALLOWALL");
  next();
});

app.route('/api/ws')
  .get((req, res) => {
    res.status(200).json({ status: "DISCONNECTED", events: [] });
  })
  .post(async (req, res) => {
    const { action, conversationId, message } = req.body;
    if (!action) {
      res.status(400).json({ error: "Missing action parameter." });
      return;
    }
    try {
      const result = await executeAction(action, conversationId, message);
      res.status(200).json(result);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errMsg });
    }
  });



app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
