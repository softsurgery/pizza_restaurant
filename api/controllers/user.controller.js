const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Sign-up a new user with detailed error handling
const signupUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    return res.status(201).send({
      message: "User Created Successfully",
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send({
        message: "Invalid user data",
        details: e.errors,
      });
    }
    if (e.code === 11000) {
      // Check which field caused the duplicate key error
      const duplicateField = Object.keys(e.keyValue)[0];
      const duplicateValue = e.keyValue[duplicateField];

      return res.status(409).send({
        message: `Duplicate key error: ${duplicateField} already exists.`,
        details: `The value "${duplicateValue}" for "${duplicateField}" is already in use.`,
      });
    }
    res.status(500).send({
      error: "Internal server error",
      message: e.message,
    });
  }
};

// Sign-in user
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie("auth_token", token, { httpOnly: true });
    res.status(200).send({ token });
  } catch (e) {
    res.status(400).send({ message: "Incorrect Credentials" });
  }
};

// Sign-out user (by clearing token)
const signoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie("auth_token");
    res.status(200).send({ message: "Successfully signed out" });
  } catch (e) {
    res.status(500).send();
  }
};

// Middleware to authenticate user with JWT
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    const email = req.body.email;

    const user = await User.findOneAndUpdate(
      { _id : userId },
      { email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  signupUser,
  signinUser,
  signoutUser,
  auth,
  updateEmail,
};
