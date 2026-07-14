//GET
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
const createPet = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} request received` }); // use req.method to dynamically display the HTTP method used in the request
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
