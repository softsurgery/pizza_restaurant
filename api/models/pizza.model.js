const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  image: {
    type: String,
    required: true,  // Assuming images are stored in an external service like AWS S3
    match: /^https?:\/\/.+/,  // Validate the image URL format
  },
  priceOfSm: {
    type: Number,
    required: true,
    min: 0, 
  },
  priceOfMd: {
    type: Number,
    required: true,
    min: 0, 
  },
  priceOfLg: {
    type: Number,
    required: true,
    min: 0, 
  },
  availableOfSm: {
    type: Boolean,
    default: true, 
  },
  availableOfMd: {
    type: Boolean,
    default: true, 
  },
  availableOfLg: {
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
