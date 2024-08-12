import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || 'development'; // Default to 'development'

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export default {
  POSTGRES_URL: process.env.POSTGRES_URL,
  API_PORT:process.env.API_PORT,
  cronUpdateVisibilitySchedule: process.env.CRON_UPDATE_VISIBILITY,
};
