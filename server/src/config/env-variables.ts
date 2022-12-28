import { config } from "dotenv";

config({ path: "../.env" });

export const DB_URL = process.env.DB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = Number(process.env.PORT ?? 4000);
export const HOST = process.env.HOST ?? "0.0.0.0";
