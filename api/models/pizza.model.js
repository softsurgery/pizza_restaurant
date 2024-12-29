const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'], 
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  available: {
    type: Boolean,
    default: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Pizza = mongoose.model('Pizza', PizzaSchema);

module.exports = Pizza;
