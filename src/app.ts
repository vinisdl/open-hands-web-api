import express from 'express';
import cors from 'cors';
import { executeAction } from './lib/wsClient.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());
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

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "WS API",
    version: "1.0.0",
    description: "API for WebSocket client."
  },
  paths: {
    "/api/ws": {
      get: {
        summary: "Get current connection status and events",
        responses: {
          "200": {
            description: "Success"
          }
        }
      },
      post: {
        summary: "Perform an action (connect, disconnect, send) on the WebSocket client",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  action: { type: "string" },
                  message: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      message: { type: "string", example: "do anything" }
                    }
                  },
                  conversationId: { type: "string" }
                },
                required: ["action"]
              }
            }
          }
        },
        responses: {
          "200": { description: "Action performed successfully" },
          "400": { description: "Bad request" }
        }
      }
    }
  }
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
