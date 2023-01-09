import { RequestHandler } from "express";
import { db } from "../helpers/db-adapter.js";

export const redirectController: RequestHandler = async (req, res) => {
  const { shortenedPath } = req.params;

  if (!shortenedPath) {
    return res.sendStatus(404);
  }
  const query = await db.query<{ long_url: string }>(`SELECT long_url FROM bitsy WHERE short_path=$1;`, [
    shortenedPath,
  ]);
  if (query.rowCount === 0) {
    return res.sendStatus(404);
  }
  return res.redirect(301, query.rows[0].long_url);
};
