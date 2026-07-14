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
  const shelter = req.body; // use req.body to access the data sent in the request body
  console.log("Received shelter:", shelter); // log the received data to the console for debugging
  const newShelter = await Shelters.create(shelter); // use the create method from the Shelters model to save the new shelter to the database
  res.status(200).json({
    success: true,
    data: newShelter,
    message: `${req.method} request received`,
  }); // use req.method to dynamically display the HTTP method used in the request
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
