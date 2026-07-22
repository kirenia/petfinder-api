const Pets = require("../models/Pets");
const messages = require("../messages/messages"); // hardcoded messages module

// GET ALL — populate the shelter, hide __v
const getAllPets = async (req, res) => {
  try {
    // filter $gte and $lte for age range from query string
    const filter = {};
    if (req.query.minAge || req.query.maxAge) {
      filter.age = {};
      if (req.query.minAge) filter.age.$gte = Number(req.query.minAge);
      if (req.query.maxAge) filter.age.$lte = Number(req.query.maxAge);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // build query
    let query = Pets.find(filter).populate("shelter");

    // select
    if (req.query.select) {
      query = query.select(req.query.select.split(",").join(" "));
    } else {
      query = query.select("-__v"); // default: just hide the version key
    }

    // sort
    if (req.query.sort) {
      query = query.sort(req.query.sort.split(",").join(" "));
    }

    // run with pagination
    const pets = await query.skip(skip).limit(limit);
    const total = await Pets.countDocuments(filter);
    res.status(200).json({
      success: true,
      data: pets,
      message: `${req.method} request to Pets endpoint received`,
      count: pets.length,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID — populate the shelter, hide __v
const getPetById = async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.id)
      .populate("shelter")
      .select("-__v");
    if (!pet) {
      return res
        .status(404)
        .json({ success: false, message: messages.PET_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: pet,
      message: `${req.method} request to Pets endpoint received`,
    });
  } catch (error) {
    // malformed id → clean 400 instead of raw Mongoose cast error
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: messages.INVALID_ID });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST — create a pet (belongs to a shelter via shelter id in the body)
const createPet = async (req, res) => {
  try {
    const newPet = await Pets.create(req.body);
    res.status(201).json({
      success: true,
      data: newPet,
      message: `${req.method} request received`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT — update by id, return the updated pet
const updatePet = async (req, res) => {
  try {
    const pet = await Pets.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!pet) {
      return res
        .status(404)
        .json({ success: false, message: messages.PET_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: pet,
      message: `${req.method} request to Pets endpoint received`,
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

// DELETE — remove by id, return the deleted pet
const deletePet = async (req, res) => {
  try {
    const pet = await Pets.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res
        .status(404)
        .json({ success: false, message: messages.PET_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      data: pet,
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
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
