const mongoose = require('mongoose');

const ToppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Topping = mongoose.model('Topping', ToppingSchema);

module.exports = Topping;
