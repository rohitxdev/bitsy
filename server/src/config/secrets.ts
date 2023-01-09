import { config } from "dotenv";
config({ path: "./config/.env" }); //Path is relative to the main file.

export const PORT = Number(process.env.PORT ?? 4000);
export const HOST = process.env.HOST ?? "0.0.0.0";
export const { DB_URL, NODE_ENV } = process.env;
