import crypto from "crypto";
import { db } from "../helpers/db-adapter.js";

export async function getShortenedPath(originalUrl: string): Promise<string> {
  const shortenedPath = crypto.randomInt(0, 10e9).toString(36).slice(0, 5);
  const query1 = db.query<{ short_path: string }>("SELECT short_path FROM bitsy WHERE long_url=$1;", [originalUrl]);
  const query2 = db.query<{ id: string }>(`SELECT short_path FROM bitsy WHERE short_path=$1;`, [shortenedPath]);
  const [q1, q2] = await Promise.all([query1, query2]);
  if (q1.rowCount !== 0) {
    return q1.rows[0].short_path;
  }
  if (q2.rowCount !== 0) {
    return await getShortenedPath(originalUrl);
  }
  await db.query("INSERT INTO bitsy(short_path,long_url) VALUES($1,$2)", [shortenedPath, originalUrl]);
  return shortenedPath;
}
