const Pizza = require("../../models/pizza.model");
const data = require("../data/pizza.data");

const seedPizzas = async () => {
  try {
    const pizzas = await Pizza.insertMany(data);
    console.log(`${pizzas.length} pizzas seeded successfully.`);
  } catch (err) {
    console.error("Failed to seed pizzas:", err.message);
    throw new Error("Pizza seeding failed");
  }
};

module.exports = seedPizzas;

