const express = require("express");
const app = express();
const routes = require("./routes/index");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/api/v1", routes);

module.exports = app;
