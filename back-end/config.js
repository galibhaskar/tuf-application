import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || 'development'; // Default to 'development'

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export default {
  hostname: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  cronUpdateVisibilitySchedule: process.env.CRON_UPDATE_VISIBILITY,
};
