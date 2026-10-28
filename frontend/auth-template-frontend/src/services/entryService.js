
import api from "./api";

// Create a new entry
async function createNewEntry(entryData) {
  const response = await api.post("/entries", entryData);
  return response.data;
}

// Get all public entries
async function getAllPublicEntries() {
  const response = await api.get("/entries");
  return response.data;
}

// Get entries belonging to the logged-in user
async function getAllMyEntries() {
  const response = await api.get("/entries/my-entries");
  return response.data;
}

export {
  createNewEntry,
  getAllPublicEntries,
  getAllMyEntries,
};
