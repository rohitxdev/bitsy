import cors from "cors";
import express from "express";
import { redirectURLHandler } from "./controllers/redirect.js";
import { shortenURLHandler } from "./controllers/shorten-url.js";
import { app } from "./utils/server.js";

app.server.use(cors(), express.static("../../client/dist"), express.text());
app.server.post("/api/shorten-url", shortenURLHandler);
app.server.get("/:shortenedPath", redirectURLHandler);
