import { Request, RequestHandler, Response } from "express";
import crypto from "crypto";
import { app } from "../utils/server.js";

async function getShortenedPath(originalUrl: string): Promise<string> {
  const shortenedPath = crypto.randomInt(0, 10e9).toString(36).slice(0, 5);
  const query = await app.db.query<{ id: string }>("SELECT id FROM bitsy_urls WHERE original_url=$1;", [originalUrl]);
  if (query.rowCount !== 0) {
    return query.rows[0].id;
  }
  const query2 = await app.db.query<{ id: string }>(`SELECT id FROM bitsy_urls WHERE id=$1;`, [shortenedPath]);
  if (query2.rowCount !== 0) {
    return await getShortenedPath(originalUrl);
  }
  await app.db.query("INSERT INTO bitsy_urls(id,original_url) VALUES($1,$2)", [shortenedPath, originalUrl]);

  return shortenedPath;
}

export const shortenURLHandler: RequestHandler = async (req, res) => {
  const originalUrl = req.body;

  if (!originalUrl) {
    return res.status(400).send("URL is empty");
  }
  const shortenedUrl = req.headers.origin + "/" + (await getShortenedPath(originalUrl));
  return res.status(200).send(shortenedUrl);
};
