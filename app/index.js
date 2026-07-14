const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index");

app.use(express.json());
app.use(morgan("dev")); // use morgan middleware for logging HTTP requests in development mode

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/api/v1", routes);

module.exports = app;
