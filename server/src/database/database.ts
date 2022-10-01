import "dotenv/config";

import pg from "pg";

const { Pool } = pg;

const environment: string = process.env.NODE_ENV || "development";

let connectionString = "";
if (environment === "production") {
  connectionString = process.env.DATABASE_URL || "";
} else {
  connectionString = process.env.DEVELOPMENT_DATABASE_URL || "";
}

const config: pg.ConnectionConfig = {
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

export default pool;
