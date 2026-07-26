// app/services/petService.js
const Pets = require("../models/Pets");
require("../models/Shelters"); // register the Shelter model so populate("shelter") works
require("dotenv").config();

// build and run the "get all pets" query from the request query string
const getAllPetsService = async (queryParams) => {
  // filter
  const filter = {};
  if (queryParams.minAge || queryParams.maxAge) {
    filter.age = {};
    if (queryParams.minAge) filter.age.$gte = Number(queryParams.minAge);
    if (queryParams.maxAge) filter.age.$lte = Number(queryParams.maxAge);
  }

  // pagination
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  // build query
  let query = Pets.find(filter).populate("shelter");

  // select
  if (queryParams.select) {
    query = query.select(queryParams.select.split(",").join(" "));
  } else {
    query = query.select("-__v");
  }

  // sort
  if (queryParams.sort) {
    query = query.sort(queryParams.sort.split(",").join(" "));
  }

  const pets = await query.skip(skip).limit(limit);
  const total = await Pets.countDocuments(filter);

  return { pets, total, page, limit };
};

module.exports = { getAllPetsService };
