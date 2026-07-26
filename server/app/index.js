const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index");
const cors = require("cors"); // so client can make requests to the server

app.use(cors()); // enable CORS for all routes

app.use(express.json());
app.use(morgan("dev")); // use morgan middleware for logging HTTP requests in development mode

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/api/v1", routes);

module.exports = app;
