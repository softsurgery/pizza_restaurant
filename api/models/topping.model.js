const mongoose = require('mongoose');

const ToppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  type: {
    type: String,
    enum: ['vegetable', 'meat', 'cheese', 'other'], 
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

const Topping = mongoose.model('Topping', ToppingSchema);

module.exports = Topping;
