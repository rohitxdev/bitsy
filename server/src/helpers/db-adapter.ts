import { DB_URL } from "../config/secrets.js";
import pg from "pg";

export const db = new pg.Pool({ connectionString: DB_URL });

export async function connectToDb() {
  try {
    await db.connect();
    console.log("\u001b[37;1mConnected to remote PostgreSQL Database... 🐘");
  } catch (err) {
    console.error(err);
  }
}
