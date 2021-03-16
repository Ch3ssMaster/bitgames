const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product structure
const PurchaseSchema = new Schema({
  purchaser: {
    type: String,
    required: true,
  },
  products: [String],
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Purchase = mongoose.model("purchases", PurchaseSchema);
