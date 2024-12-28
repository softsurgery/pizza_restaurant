const Note = require('../models/note.model');

const createNote = async (req, res) => {
  try {
    const note = new Note({
      content: req.body.content,
      user: req.user._id // Assuming the user is authenticated and attached to `req.user`
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all notes for the logged-in user
const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a note
const updateNote = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['content', 'archived'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).send();
    }

    updates.forEach((update) => note[update] = req.body[update]);
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote
};
