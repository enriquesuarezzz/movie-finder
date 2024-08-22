// server/routes/directors.js
import { Router } from "express";
const router = Router();
import { query } from "../db.mjs";

// Get all directors
router.get("/", async (req, res) => {
  try {
    const [directors] = await query("SELECT * FROM directors");
    res.json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new director
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await query("INSERT INTO directors (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
