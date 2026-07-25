require("dotenv").config();
const app = require("./app");
const connectDB = require("./app/db/config");

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
