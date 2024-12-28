const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Sign-up a new user
const signupUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign-in user
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token, { httpOnly: true });
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: 'Incorrect Credentials' });
  }
};

// Sign-out user (by clearing token)
const signoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('auth_token');
    res.status(200).send({ message: 'Successfully signed out' });
  } catch (e) {
    res.status(500).send();
  }
};

// Middleware to authenticate user with JWT
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = {
  signupUser,
  signinUser,
  signoutUser,
  auth
};