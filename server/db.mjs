import { createPool } from "mysql2/promise";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.DB_HOST || "your-database-host", // Replace with your actual database host
  user: process.env.DB_USER || "your-database-username", // Replace with your actual database username
  password: process.env.DB_PASSWORD || "your-database-password", // Replace with your actual database password
  database: process.env.DB_NAME || "your-database-name", // Replace with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define and export the `query` function
export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Export the pool in case you need it elsewhere
export default pool;
