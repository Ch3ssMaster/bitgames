const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// User structure
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    min: 0,
    max: 2,
    enum: [0, 1, 2],
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
