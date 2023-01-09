import console from "console";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { PORT, HOST, NODE_ENV } from "./config/secrets.js";
import { redirectController } from "./controllers/redirect.js";
import { shortenURLController } from "./controllers/shorten-url.js";
import { connectToDb } from "./helpers/db-adapter.js";

await connectToDb();

const app = express();

app.use(cors(), express.static("../../client/dist/"), express.text());
app.post("/api/shorten-url", shortenURLController);
app.get("/:shortenedPath", redirectController);

app.listen(PORT, HOST, () => {
  const ENV = NODE_ENV === "development" ? `\u001b[33;1m${NODE_ENV}` : `\u001b[32;1m${NODE_ENV}`;
  console.log(
    `\u001b[37;1mServer is listening to \u001b[35;1mhttp://${HOST}:${PORT}\u001b[0m \u001b[37;1mand running in ${ENV}\u001b[0m \u001b[37;1menvironment...`
  );
});
