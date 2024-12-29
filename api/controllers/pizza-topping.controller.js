const PizzaTopping = require('../models/pizza-topping.model.js');

const createPizzaTopping = async (req, res) => {
  try {
    const pizzaTopping = new PizzaTopping(req.body);
    const savedPizzaTopping = await pizzaTopping.save();
    res.status(201).json(savedPizzaTopping);
  } catch (err) {
    res.status(400).json({ message: 'Error creating pizza topping', error: err.message });
  }
};

const getAllPizzaToppings = async (req, res) => {
  try {
    const pizzaToppings = await PizzaTopping.find()
      .populate('pizza', 'name size') // Populate pizza details
      .populate('topping', 'name type price'); // Populate topping details
    res.status(200).json(pizzaToppings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pizza toppings', error: err.message });
  }
};

const getPizzaToppingById = async (req, res) => {
  try {
    const pizzaTopping = await PizzaTopping.findById(req.params.id)
      .populate('pizza', 'name size')
      .populate('topping', 'name type price');
    if (!pizzaTopping) {
      return res.status(404).json({ message: 'Pizza topping not found' });
    }
    res.status(200).json(pizzaTopping);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pizza topping', error: err.message });
  }
};

const updatePizzaTopping = async (req, res) => {
  try {
    const pizzaTopping = await PizzaTopping.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before saving
    });
    if (!pizzaTopping) {
      return res.status(404).json({ message: 'Pizza topping not found' });
    }
    res.status(200).json(pizzaTopping);
  } catch (err) {
    res.status(400).json({ message: 'Error updating pizza topping', error: err.message });
  }
};

const deletePizzaTopping = async (req, res) => {
  try {
    const pizzaTopping = await PizzaTopping.findByIdAndDelete(req.params.id);
    if (!pizzaTopping) {
      return res.status(404).json({ message: 'Pizza topping not found' });
    }
    res.status(200).json({ message: 'Pizza topping deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pizza topping', error: err.message });
  }
};

module.exports = {
  createPizzaTopping,
  getAllPizzaToppings,
  getPizzaToppingById,
  updatePizzaTopping,
  deletePizzaTopping,
};
