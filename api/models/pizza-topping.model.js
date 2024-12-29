const mongoose = require('mongoose');

const PizzaToppingSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true,
  },
  topping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topping',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0,
  },
});

const PizzaTopping = mongoose.model('PizzaTopping', PizzaToppingSchema);

module.exports = PizzaTopping;
