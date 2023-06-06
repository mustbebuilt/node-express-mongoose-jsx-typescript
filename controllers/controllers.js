// Import the necessary modules
const Film = require("../models/Film");

// Define the controller functions
async function getAllData() {
  try {
    // Query the collection to retrieve all films
    const films = await Film.find();
    console.dir(Film);
    return films;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

async function getDataById(id) {
  try {
    // Query the collection to retrieve a film by ID
    const film = await Film.findById(id);
    return film;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

// create
async function createData(data) {
  try {
    const newDocument = await Film.create(data);
    console.log(newDocument);
    return newDocument;
  } catch (error) {
    console.error("Error creating data:", error);
    return { error: "Failed to create data" };
  }
}
// update
async function updateData(id, data) {
  try {
    const updatedDocument = await Film.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDocument;
  } catch (error) {
    console.error("Error updating data:", error);
    return { error: "Failed to update data" };
  }
}

// delete
async function deleteData(id) {
  try {
    const deletedDocument = await Film.findByIdAndDelete(id);
    return deletedDocument;
  } catch (error) {
    console.error("Error deleting data:", error);
    return { error: "Failed to delete data" };
  }
}

// Export the controller functions
module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
