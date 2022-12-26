import pg from "pg";
import express from "express";
import { PORT, HOST, NODE_ENV, DB_URL } from "./secrets.js";

class ExpressServer {
  #isRunning = false;
  #isConnectedToDb = false;
  db = new pg.Pool({ connectionString: DB_URL });
  server = express();

  constructor() {
    if (!this.#isRunning) {
      this.#connectToDb().then(() => {
        this.server.listen(PORT, HOST, () => {
          this.#isRunning = true;
          const ENV = NODE_ENV === "development" ? `\u001b[33;1m${NODE_ENV}` : `\u001b[32;1m${NODE_ENV}`;
          console.log(
            `\u001b[37;1mServer is listening to \u001b[35;1mhttp://${HOST}:${PORT}\u001b[0m \u001b[37;1mand running in ${ENV}\u001b[0m \u001b[37;1menvironment...`
          );
        });
      });
    } else {
      console.log("Server is already running.");
    }
  }

  async #connectToDb() {
    try {
      if (!this.#isConnectedToDb) {
        await this.db.connect();
        this.#isConnectedToDb = true;
        console.log("\u001b[37;1mConnected to remote PostgreSQL Database... 🌏🐘");
      } else {
        throw new Error("Already connected to database.");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
export const app = new ExpressServer();
