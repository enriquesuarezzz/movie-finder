// server/db.js
import { createPool } from "mysql2";

// Create a connection pool
const pool = createPool({
  host: "localhost", // Replace with MySQL host when its ready
  user: "root", // Replace with MySQL username
  password: "password", // Replace with  MySQL password
  database: "my_database", // Replace with  database name
});

export default pool.promise();
