const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
