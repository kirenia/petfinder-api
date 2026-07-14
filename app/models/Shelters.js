// Shelters model
const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shelter name is required"],
    maxlength: [100, "Shelter name cannot exceed 100 characters"],
    unique: true, // ensure that the shelter name is unique in the database
  },
  location: {
    type: String,
    required: [true, "Shelter location is required"],
    maxlength: [200, "Shelter location cannot exceed 200 characters"],
  },
  phone: {
    type: String,
    maxlength: [20, "Shelter phone cannot exceed 20 characters"],
  },
});

const Shelter = mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;
