const { auth } = require("../controllers/user.controller.js"); // Middleware to ensure the user is authenticated

module.exports = (app) => {
  const Note = require("../controllers/note.controller.js");

  app.post("/notes", auth, Note.createNote);
  app.get("/notes", auth, Note.getUserNotes);
  app.patch("/notes/:id", auth, Note.updateNote);
  app.delete("/notes/:id", auth, Note.deleteNote);
};
