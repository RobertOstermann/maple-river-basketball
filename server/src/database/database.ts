import "dotenv/config";

import pg from "pg";

const { Pool } = pg;

const connectionString: string = process.env.DATABASE_URL ?? "";

const config: pg.ConnectionConfig = {
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

export default pool;
