import { Router } from "express";
import { query } from "../db.js";
import { formatDateToMySQL } from "../utils/dateFormatter.js";
import responseMapper from "../utils/responseMapper.js";

const router = Router();
router.use(responseMapper);

// Get all banners
router.get("/", async (req, res) => {
  try {
    const results = await query("SELECT * FROM banner where visible = true");
    res.json(res.mapResponse(results));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get banner by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await query(`SELECT * FROM banner WHERE id = ${id}`);
    if (results.length === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(res.mapResponse(results[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new banner
router.post("/", async (req, res) => {
  const { description, timer, link, 
        visible, visibleDateTime } = req.body;
  try {
    const formattedVisibleDateTime = formatDateToMySQL(new Date(visibleDateTime));

    await query(
      `INSERT INTO banner (description, timer, link, visible, visible_datetime) 
            VALUES ('${description}', ${timer}, 
            '${link}', ${visible}, '${formattedVisibleDateTime}')`
    );
    res.status(201).json({ message: "Banner created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update banner data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  
  const { description, timer, link, visible, visibleDateTime } = req.body;

  try {
    const formattedVisibleDateTime = formatDateToMySQL(new Date(visibleDateTime));
    await query(
      `UPDATE banner SET description = '${description}', 
        timer = ${timer}, link = '${link}', 
        visible = ${visible}, visible_datetime = '${formattedVisibleDateTime}'
        WHERE id = ${id}`
    );
    res.json({ message: "Banner updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await query(
      `UPDATE banner SET visible = false WHERE id = ${id}`
    );
    res.json({ message: "Banner Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
