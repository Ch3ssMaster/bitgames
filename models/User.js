const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    index: true, 
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  role: {
    type: Number,
    min: 0,
    max: 2,
    enum: [0, 1, 2],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  }
});

UserSchema.plugin(require('mongoose-bcrypt'));
UserSchema.plugin(require('mongoose-unique-validator'));

module.exports = User = mongoose.model("User", UserSchema);
