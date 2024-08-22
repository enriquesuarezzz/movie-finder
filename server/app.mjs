import express from "express";
import cors from "cors";
import "dotenv/config"; // Load environment variables from .env file

import genresRoutes from "./routes/genres.mjs";
import directorsRouter from "./routes/directors.mjs";
import moviesRouter from "./routes/movies.mjs";
import actorsRouter from "./routes/actors.mjs";
import userFavoritesRouter from "./routes/userFavorites.mjs";

const app = express();

app.use(express.json());
app.use(cors());

app.use("./genres", genresRoutes);
app.use("./directors", directorsRouter);
app.use("./movies", moviesRouter);
app.use("./actors", actorsRouter);
app.use("./userFavorites", userFavoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
