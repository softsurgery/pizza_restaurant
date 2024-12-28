const mongoose = require('mongoose');

// Define Note Schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
