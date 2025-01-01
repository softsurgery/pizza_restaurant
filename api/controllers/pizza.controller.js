const Pizza = require("../models/pizza.model.js");

const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch pizzas", details: err.message });
  }
};

const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.status(200).json(pizza);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch pizza", details: err.message });
  }
};

const createPizza = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      size,
      priceOfSm,
      priceOfMd,
      priceOfLg,
      availableOfSm,
      availableOfMd,
      availableOfLg,
    } = req.body;
    const pizza = new Pizza({
      name,
      description,
      image,
      size,
      priceOfSm,
      priceOfMd,
      priceOfLg,
      availableOfSm,
      availableOfMd,
      availableOfLg,
    });
    const savedPizza = await pizza.save();
    res.status(201).json(savedPizza);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create pizza", details: err.message });
  }
};

const updatePizza = async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPizza) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.status(200).json(updatedPizza);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update pizza", details: err.message });
  }
};

const deletePizza = async (req, res) => {
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.status(200).json({ message: "Pizza deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete pizza", details: err.message });
  }
};

module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};
