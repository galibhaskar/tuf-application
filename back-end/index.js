import express, { json } from 'express';
import cors from 'cors';
import config from './config.js';
import bannerRoutes from './routes/banner.js';
import "./cron-jobs/index.js";

const app = express();

const port = process.env.API_PORT || config.API_PORT || 3001;

const host = process.env.HOSTNAME || config.hostname || 'localhost';

app.use(cors());

app.use(json());

app.use('/api/banner', bannerRoutes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});