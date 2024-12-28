const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

// Hash password before saving user
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate JWT Token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    try {
      console.log('Generating JWT Token');
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return token;
    } catch (error) {
      console.error('Error generating auth token:', error);
      throw new Error('Token generation failed');
    }
  };
  
// Verify user credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login, invalid credentials.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login, invalid credentials.');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
