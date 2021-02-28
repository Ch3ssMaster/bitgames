const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product structure
const ProductSchema = new Schema({
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
  img:{
    localImg: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: false,
    },
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
