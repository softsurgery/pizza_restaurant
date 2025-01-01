const mongoose = require("mongoose");

/**
 * Clears the specified collections or the entire database.
 * @param {Array<string>} collections - List of collection names to clear. If empty, clears the entire database.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
const clearDatabase = async (collections = []) => {
  try {
    if (collections.length === 0) {
      // Drop the entire database
      await mongoose.connection.dropDatabase();
      console.log("Database cleared successfully.");
    } else {
      // Clear only the specified collections
      for (const collection of collections) {
        if (mongoose.connection.collections[collection]) {
          await mongoose.connection.collections[collection].deleteMany({});
          console.log(`Collection '${collection}' cleared successfully.`);
        } else {
          console.warn(`Collection '${collection}' does not exist.`);
        }
      }
    }
  } catch (err) {
    console.error("Failed to clear the database:", err.message);
    throw new Error("Database clearing failed");
  }
};

module.exports = { clearDatabase };
