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
