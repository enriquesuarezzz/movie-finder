// server/routes/userFavorites.js
import { Router } from "express";
const router = Router();
import { query } from "../db.mjs";

// Get all favorite movies for a user
router.get("/:userId", async (req, res) => {
  try {
    const [favorites] = await query(
      `
      SELECT movies.* 
      FROM user_favorites 
      JOIN movies ON user_favorites.movie_id = movies.id 
      WHERE user_favorites.user_id = ?`,
      [req.params.userId]
    );
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a movie to user favorites
router.post("/", async (req, res) => {
  const { user_id, movie_id } = req.body;

  try {
    await query(
      "INSERT INTO user_favorites (user_id, movie_id) VALUES (?, ?)",
      [user_id, movie_id]
    );
    res.status(201).json({ message: "Movie added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
