import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST as string,
  user: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export default pool;

// CREATE USER unijet WITH PASSWORD 'n3rFg3nG1.';
// GRANT ALL PRIVILEGES ON DATABASE "unijet" to unijet;
