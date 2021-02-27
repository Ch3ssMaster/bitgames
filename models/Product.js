const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product structure
const UserSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: { unique: true },
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImg: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = User = mongoose.model("product", UserSchema);
