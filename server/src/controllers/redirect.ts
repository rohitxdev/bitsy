import { RequestHandler } from "express";
import { app } from "../utils/server.js";

export const redirectURLHandler: RequestHandler = async (req, res) => {
  if (req.header("sec-fetch-mode") !== "navigate") {
    return res.sendStatus(404);
  }
  const { shortenedPath } = req.params;
  const query = await app.db.query(`SELECT original_url FROM bitsy_urls WHERE id=$1;`, [shortenedPath]);
  if (query.rowCount === 0) {
    return res.sendStatus(404);
  }
  return res.redirect(301, query.rows[0].original_url);
};
