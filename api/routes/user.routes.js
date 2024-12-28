module.exports = (app) => {
  const User = require("../controllers/user.controller.js");

  app.post("/signup", User.signupUser);
  app.post("/signin", User.signinUser);
  app.post("/signout", User.auth, User.signoutUser);
};
