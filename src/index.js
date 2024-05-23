import dotenv from "dotenv"

import DB_CONNECT from "./db/index.js";

dotenv.config({
  path: "./env",
});

DB_CONNECT();
