import { pool } from "../db.js";

const updateBannerVisibility = async () => {
  const connection = await pool.getConnection();
  try {
    // Get current time
    const now = new Date();

    // Query to find banners that need to be updated
    const [banners] = await connection.query(
      `SELECT id, visible_datetime, timer FROM banner
         WHERE visible = 1 AND (visible_datetime <= ${now} 
            OR DATE_ADD(visible_datetime, INTERVAL timer SECOND) <= ${now})`
    );

    // Update banners to not visible
    for (const banner of banners) {
      await connection.query(
        `UPDATE banner SET visible = 0 WHERE id = ${banner.id}`
      );
    }

    console.log(`Updated visibility for ${banners.length} banners.`);
  } catch (err) {
    console.error("Error updating banner visibility:", err.message);
  } finally {
    if (connection) connection.release();
  }
};

export default updateBannerVisibility;
