// Pets model for MongoDB using Mongoose
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pet name is required"],
    maxlength: [50, "Pet name cannot exceed 50 characters"],
  },
  type: {
    type: String,
    required: [true, "Pet type is required"],
    enum: {
      // use enum to restrict the values of the type field to a specific set of values
      values: ["Dog", "Cat", "Bird", "Other"],
      message: "Pet type must be either Dog, Cat, Bird, or Other",
    },
  },
  age: {
    type: Number,
    required: [true, "Pet age is required"],
    min: [0, "Pet age cannot be negative"],
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId, // stores a MongoDB id
    ref: "Shelter", // points to the Shelter model — THIS is the relationship
    required: [true, "A pet must belong to a shelter"],
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
