import express from "express";
import cors from "cors";
import "dotenv/config"; // Load environment variables from .env file

const genresRoutes = require("./routes/genres");
const directorsRouter = require("./routes/directors");
const moviesRouter = require("./routes/movies");
const actorsRouter = require("./routes/actors");
const usersRouter = require("./routes/users");
const userFavoritesRouter = require("./routes/userFavorites");

const app = express();

app.use(express.json());
app.use(cors());

app.use("./genres", genresRoutes);
app.use("./directors", directorsRouter);
app.use("./movies", moviesRouter);
app.use("./actors", actorsRouter);
app.use("./users", usersRouter);
app.use("./userFavorites", userFavoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
