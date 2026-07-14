const Shelters = require("../models/Shelters");

//GET ALL
const getAllShelters = async (req, res) => {
  const shelters = await Shelters.find(); // use the find method from the Shelters model to retrieve all shelters from the database
  res.status(200).json({
    success: true,
    data: shelters,
    message: `${req.method} request to Shelters endpoint received`,
  }); // use req.method to dynamically display the HTTP method used in the request
};

// GET BY ID
const getShelterById = async (req, res) => {
  const shelter = await Shelters.findById(req.params.id); // use the findById method from the Shelters model to retrieve a shelter by its ID from the database
  if (!shelter) {
    return res.status(404).json({
      success: false,
      message: "Shelter not found",
    }); // return a 404 error if the shelter is not found in the database
  }
  res.status(200).json({
    success: true,
    data: shelter,
    message: `${req.method} request to Shelters endpoint received`,
  }); // use req.method to dynamically display the HTTP method used in the request

  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// POST
const createShelter = async (req, res) => {
  try {
    const shelter = req.body; // data from the request body
    console.log("Received shelter:", shelter);
    const newShelter = await Shelters.create(shelter); // save to database
    res.status(201).json({
      success: true,
      data: newShelter,
      message: `${req.method} request received`,
    });
  } catch (error) {
    // validation errors (missing name, duplicate, etc)
    res.status(400).json({
      success: false,
      message: "Error creating shelter",
      error: error.message,
    });
  }
};

// PUT
const updateShelter = async (req, res) => {
  const shelter = await Shelters.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // use the findByIdAndUpdate method from the Shelters model to update a shelter by its ID in the database
  if (!shelter) {
    return res.status(404).json({
      success: false,
      message: "Shelter not found",
    }); // return a 404 error if the shelter is not found in the database
  }
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// DELETE
const deleteShelter = async (req, res) => {
  const shelter = await Shelters.findByIdAndDelete(req.params.id); // use the findByIdAndDelete method from the Shelters model to delete a shelter by its ID from the database
  if (!shelter) {
    return res.status(404).json({
      success: false,
      message: "Shelter not found",
    }); // return a 404 error if the shelter is not found in the database
  }
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

module.exports = {
  getAllShelters,
  getShelterById,
  createShelter,
  updateShelter,
  deleteShelter,
};
