const express = require("express");
const router = express.Router();

// Model
const Product = require("../../models/Product");

// @route GET api/users
// @desc GET All users
// @access Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ title: 1 })
    .then((products) => {
      res.json(products)
    });
});

module.exports = router;
