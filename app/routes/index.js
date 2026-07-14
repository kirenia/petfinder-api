const express = require("express");
const router = express.Router();
const petRoutes = require("./petRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
});

router.use("/pets", petRoutes);

module.exports = router;
