const Shelters = require("../models/Shelters");
const messages = require("../messages/messages"); // hardcoded messages module

// GET ALL — hide __v
const getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelters.find().select("-__v");
    res.status(200).json({
      success: true,
      data: shelters,
      message: `${req.method} request to Shelters endpoint received`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID — hide __v
const getShelterById = async (req, res) => {
  try {
    const shelter = await Shelters.findById(req.params.id).select("-__v");
    if (!shelter) {
      return res
        .status(404)
        .json({ success: false, message: messages.SHELTER_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: shelter,
      message: `${req.method} request to Shelters endpoint received`,
    });
  } catch (error) {
    // malformed id (not a valid ObjectId) → clean 400 instead of raw Mongoose error
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: messages.INVALID_ID });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST — create a shelter
const createShelter = async (req, res) => {
  try {
    const newShelter = await Shelters.create(req.body);
    res.status(201).json({
      success: true,
      data: newShelter,
      message: `${req.method} request received`,
    });
  } catch (error) {
    // validation errors (missing name, duplicate name) land here
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT — update by id, return the updated shelter
const updateShelter = async (req, res) => {
  try {
    const shelter = await Shelters.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!shelter) {
      return res
        .status(404)
        .json({ success: false, message: messages.SHELTER_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: shelter,
      message: `${req.method} request to Shelters endpoint received`,
    });
  } catch (error) {
    // bad id → 400 clean message; other validation errors also 400
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: messages.INVALID_ID });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE — remove by id, return the deleted shelter
const deleteShelter = async (req, res) => {
  try {
    const shelter = await Shelters.findByIdAndDelete(req.params.id);
    if (!shelter) {
      return res
        .status(404)
        .json({ success: false, message: messages.SHELTER_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: shelter,
      message: `${req.method} request received`,
    });
  } catch (error) {
    // bad id → clean 400 instead of raw Mongoose cast error
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: messages.INVALID_ID });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllShelters,
  getShelterById,
  createShelter,
  updateShelter,
  deleteShelter,
};
