// Pets model for MongoDB using Mongoose
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pet name is required"],
  },
  type: {
    type: String,
    required: [true, "Pet type is required"],
  },
  age: {
    type: Number,
    required: [true, "Pet age is required"],
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
