const express = require("express");
const router = express.Router();
const {
  getAllShelters,
  getShelterById,
  createShelter,
  updateShelter,
  deleteShelter,
} = require("../controllers/shelterController");

router.get("/", getAllShelters);
router.get("/:id", getShelterById);
router.post("/", createShelter);
router.put("/:id", updateShelter);
router.delete("/:id", deleteShelter);

module.exports = router;
