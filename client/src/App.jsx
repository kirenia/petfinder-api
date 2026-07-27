// client/src/App.jsx
import { useState, useEffect } from "react";
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
  getShelters,
  createShelter,
  deleteShelter,
} from "./api";

function App() {
  // state to hold our data from the backend
  const [pets, setPets] = useState([]);
  const [shelters, setShelters] = useState([]);

  // PET form state
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [petAge, setPetAge] = useState("");
  const [petShelter, setPetShelter] = useState("");

  // SHELTER form state
  const [shelterName, setShelterName] = useState("");
  const [shelterLocation, setShelterLocation] = useState("");
  const [shelterPhone, setShelterPhone] = useState("");

  // track which pet is being edited and the edited values
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  // fetch pets and shelters once when the app loads
  useEffect(() => {
    getPets()
      .then((res) => setPets(res.data.data))
      .catch((err) => console.error("Error loading pets:", err));

    getShelters()
      .then((res) => setShelters(res.data.data))
      .catch((err) => console.error("Error loading shelters:", err));
  }, []);

  // create a new pet, then refresh the list
  const handleAddPet = async (e) => {
    e.preventDefault(); // stop the page from reloading on submit
    try {
      const newPet = {
        name: petName,
        type: petType,
        age: Number(petAge),
        shelter: petShelter,
      };
      await createPet(newPet); // POST to the backend
      // refetch pets so the new one shows up
      const res = await getPets();
      setPets(res.data.data);
      // clear the form
      setPetName("");
      setPetAge("");
      setPetShelter("");
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  // delete a pet, then refresh the list
  const handleDeletePet = async (id) => {
    try {
      await deletePet(id);
      const res = await getPets();
      setPets(res.data.data);
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  // start editing a pet — load its current values into the edit form
  const startEdit = (pet) => {
    setEditingId(pet._id);
    setEditName(pet.name);
    setEditAge(pet.age);
  };

  // save the edited pet, then refresh the list
  const handleUpdatePet = async (id) => {
    try {
      await updatePet(id, { name: editName, age: Number(editAge) });
      const res = await getPets();
      setPets(res.data.data);
      setEditingId(null); // exit edit mode
    } catch (err) {
      console.error("Error updating pet:", err);
    }
  };

  // CREATE SHELTER
  const handleAddShelter = async (e) => {
    e.preventDefault();
    try {
      await createShelter({
        name: shelterName,
        location: shelterLocation,
        phone: shelterPhone,
      });
      const res = await getShelters();
      setShelters(res.data.data);
      setShelterName("");
      setShelterLocation("");
      setShelterPhone("");
    } catch (err) {
      console.error("Error adding shelter:", err);
    }
  };

  // delete a shelter, then refresh the list
  const handleDeleteShelter = async (id) => {
    try {
      await deleteShelter(id);
      const res = await getShelters();
      setShelters(res.data.data);
    } catch (err) {
      console.error("Error deleting shelter:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Petfinder</h1>

      <section>
        <h2>Shelters ({shelters.length})</h2>
        <form onSubmit={handleAddShelter} style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Shelter name"
            value={shelterName}
            onChange={(e) => setShelterName(e.target.value)}
            required
          />
          <input
            placeholder="Location"
            value={shelterLocation}
            onChange={(e) => setShelterLocation(e.target.value)}
            required
          />
          <input
            placeholder="Phone"
            value={shelterPhone}
            onChange={(e) => setShelterPhone(e.target.value)}
          />
          <button type="submit">Add Shelter</button>
        </form>
        <ul>
          {shelters.map((shelter) => (
            <li key={shelter._id}>
              <span style={{ flex: 1 }}>
                <strong>{shelter.name}</strong> — {shelter.location}
                {shelter.phone && ` — ${shelter.phone}`}
              </span>
              <button onClick={() => handleDeleteShelter(shelter._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Pets ({pets.length})</h2>
        <form onSubmit={handleAddPet} style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Pet name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
          <select value={petType} onChange={(e) => setPetType(e.target.value)}>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Other</option>
          </select>
          <input
            placeholder="Age"
            type="number"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            required
          />
          <select
            value={petShelter}
            onChange={(e) => setPetShelter(e.target.value)}
            required>
            <option value="">Select a shelter</option>
            {shelters.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Pet</button>
        </form>
        <ul>
          {pets.map((pet) => (
            <li key={pet._id}>
              {editingId === pet._id ? (
                // edit mode — show inputs
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                  <button onClick={() => handleUpdatePet(pet._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                // normal view
                <>
                  <span style={{ flex: 1 }}>
                    <strong>{pet.name}</strong> ({pet.type}, age {pet.age})
                    {pet.shelter && ` — lives at ${pet.shelter.name}`}
                  </span>
                  <button onClick={() => startEdit(pet)}>Edit</button>
                  <button onClick={() => handleDeletePet(pet._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
