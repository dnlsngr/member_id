import express from "express";
import bodyParser from "body-parser";

// App initialization
const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

// Express handlers
app.get("/healthcheck", (req, res) => {
  res.send("success");
});

const PORT = process.env.PORT || 3000;
export const appForTest = app.listen(PORT, function() {
  console.log(`Backend listening on port ${PORT}`);
});