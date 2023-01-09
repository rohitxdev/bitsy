import { RequestHandler } from "express";
import { getShortenedPath } from "../helpers/get-shortened-path.js";

export const shortenURLController: RequestHandler = async (req, res) => {
  const longUrl = req.body;

  if (!longUrl) {
    return res.status(400).send("URL is empty");
  }
  const shortenedPath = await getShortenedPath(longUrl);
  return res.status(200).send(shortenedPath);
};
