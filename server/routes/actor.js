// server/routes/actors.js
import { Router } from "express";
const router = Router();
import { query } from "../db";

// Get all actors
router.get("/", async (req, res) => {
  try {
    const [actors] = await query("SELECT * FROM actors");
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new actor
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await query("INSERT INTO actors (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
