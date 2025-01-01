const Topping = require("../../models/topping.model");
const data = require("../data/toppings.data");

const seedToppings = async () => {
  try {
    const toppings = await Topping.insertMany(data);
    console.log(`${toppings.length} toppings seeded successfully.`);
  } catch (err) {
    console.error("Failed to seed toppings:", err.message);
    throw new Error("Topping seeding failed");
  }
};

module.exports = seedToppings;