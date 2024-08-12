import express, { json } from 'express';
import cors from 'cors';
import config from './config.js';
import bannerRoutes from './routes/banner.js';
import "./cron-jobs/index.js";

const app = express();

const port = config.port || 5000;

app.use(cors());

app.use(json());

app.use('/api/banner', bannerRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});