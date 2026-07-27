// client/src/api.js
// all calls to the backend live here, using axios
import axios from "axios";

// axios client pointed at your backend API
const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// ---- PETS ----
export const getPets = () => API.get("/pets");
export const createPet = (pet) => API.post("/pets", pet);
export const updatePet = (id, pet) => API.put(`/pets/${id}`, pet);
export const deletePet = (id) => API.delete(`/pets/${id}`);

// ---- SHELTERS ----
export const getShelters = () => API.get("/shelters");
export const createShelter = (shelter) => API.post("/shelters", shelter);
export const updateShelter = (id, shelter) =>
  API.put(`/shelters/${id}`, shelter);
export const deleteShelter = (id) => API.delete(`/shelters/${id}`);
