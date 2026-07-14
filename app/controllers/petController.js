const Pets = require("../models/Pets");

//GET ALL
const getAllPets = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// GET BY ID
const getPetById = (req, res) => {
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// POST
const createPet = async (req, res) => {
  const pet = req.body; // use req.body to access the data sent in the request body
  console.log("Received pet:", pet); // log the received data to the console for debugging
  const newPet = await Pets.create(pet); // use the create method from the Pets model to save the new pet to the database
  res.status(200).json({
    success: true,
    data: newPet,
    message: `${req.method} request received`,
  }); // use req.method to dynamically display the HTTP method used in the request
};

// PUT
const updatePet = (req, res) => {
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// DELETE
const deletePet = (req, res) => {
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
