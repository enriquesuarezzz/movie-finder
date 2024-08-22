import express from "express";
const router = express.Router();
import { query } from "../db.mjs";

//get all genres
router.get("/", async (req, res) => {
  try {
    const [genres] = await db.query("SELECT * FROM genres");
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await db.query("INSERT INTO genres (name) VALUES (?)", [
      name,
    ]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
