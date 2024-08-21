// server/db.js
import { createPool } from "mysql2/promise";

// Database connection pool
const pool = createPool({
  host: "your-database-host", // Replace with  database host when its ready
  user: "your-database-username", // Replace with database username when its ready
  password: "your-database-password", // Replace with database password when its ready
  database: "your-database-name", // Replace with database name when its ready
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
