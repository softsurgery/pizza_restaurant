const Topping = require('../models/topping.model.js');

const getAllToppings = async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.status(200).json(toppings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching toppings', error: err.message });
  }
};

const getToppingById = async (req, res) => {
  try {
    const topping = await Topping.findById(req.params.id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching topping', error: err.message });
  }
};

const createTopping = async (req, res) => {
  try {
    const topping = new Topping(req.body);
    const savedTopping = await topping.save();
    res.status(201).json(savedTopping);
  } catch (err) {
    res.status(400).json({ message: 'Error creating topping', error: err.message });
  }
};

const updateTopping = async (req, res) => {
  try {
    const topping = await Topping.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation
    });
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.status(200).json(topping);
  } catch (err) {
    res.status(400).json({ message: 'Error updating topping', error: err.message });
  }
};

const deleteTopping = async (req, res) => {
  try {
    const topping = await Topping.findByIdAndDelete(req.params.id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.status(200).json({ message: 'Topping deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting topping', error: err.message });
  }
};

module.exports = {
    getAllToppings,
    getToppingById,
    createTopping,
    updateTopping,
    deleteTopping,
};
  