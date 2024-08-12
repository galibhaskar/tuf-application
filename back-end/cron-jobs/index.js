import cron from 'node-cron';
import updateBannerVisibility from "./updateVisibility.js";
import config from '../config.js';

// Schedule the cron job
cron.schedule(config.cronUpdateVisibilitySchedule, () => {
  console.log("Running banner visibility update job...");
  updateBannerVisibility();
});
