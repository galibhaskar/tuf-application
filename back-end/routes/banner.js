import { Router } from "express";
import { query } from "../db.js";
const router = Router();

// Get all banners
router.get("/", async (req, res) => {
  try {
    const results = await query("SELECT * FROM banner where visible = 1");
    res.json(results);
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
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new banner
router.post("/", async (req, res) => {
  const { description, timer, link, 
        visible, visible_datetime } = req.body;
  try {
    await query(
      `INSERT INTO banner (description, timer, link, visible, visible_datetime) 
            VALUES ('${description}', ${timer}, 
            '${link}', ${visible}, '${visible_datetime}')`
    );
    res.status(201).json({ message: "Banner created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update banner data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description, timer, link, visible, visible_datetime } = req.body;
  try {
    await query(
      `UPDATE banner SET description = '${description}', 
        timer = ${timer}, link = '${link}', 
        visible = ${visible}, visible_datetime = '${visible_datetime}'
        WHERE id = ${id}`
    );
    res.json({ message: "Banner updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
