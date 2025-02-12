import * as dotenv from 'dotenv';
dotenv.config();
import { Config } from './config.js';
import app from './app.js';

const port = Config.port;

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port: ${port}`);
});
