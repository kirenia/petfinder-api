const Pets = require("../models/Pets");

//GET ALL
const getAllPets = async (req, res) => {
  const pets = await Pets.find(); // use the find method from the Pets model to retrieve all pets from the database
  res.status(200).json({
    success: true,
    data: pets,
    message: `${req.method} request to Pets endpoint received`,
  }); // use req.method to dynamically display the HTTP method used in the request
};

// GET BY ID
const getPetById = async (req, res) => {
  const pet = await Pets.findById(req.params.id); // use the findById method from the Pets model to retrieve a pet by its ID from the database
  if (!pet) {
    return res.status(404).json({
      success: false,
      message: "Pet not found",
    }); // return a 404 error if the pet is not found in the database
  }
  res.status(200).json({
    success: true,
    data: pet,
    message: `${req.method} request to Pets endpoint received`,
  }); // use req.method to dynamically display the HTTP method used in the request

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
const updatePet = async (req, res) => {
  const pet = await Pets.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // use the findByIdAndUpdate method from the Pets model to update a pet by its ID in the database
  if (!pet) {
    return res.status(404).json({
      success: false,
      message: "Pet not found",
    }); // return a 404 error if the pet is not found in the database
  }
  const { id } = req.params; // use req.params to access the id parameter from the URL
  res
    .status(200)
    .json({ id, success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
};

// DELETE
const deletePet = async (req, res) => {
  const pet = await Pets.findByIdAndDelete(req.params.id); // use the findByIdAndDelete method from the Pets model to delete a pet by its ID from the database
  if (!pet) {
    return res.status(404).json({
      success: false,
      message: "Pet not found",
    }); // return a 404 error if the pet is not found in the database
  }
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
