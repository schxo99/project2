const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: "./src/config/.env" });

app.listen(process.env.PORT);
