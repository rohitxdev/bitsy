import { config } from "dotenv";

//.env path should be relative to where the process is running from, not where the file is located.
config({ path: "../.env" });
const { NODE_ENV, DB_URL } = process.env;
const PORT = Number(process.env.PORT ?? 4000);
const HOST = "0.0.0.0";

export { PORT, HOST, NODE_ENV, DB_URL };
