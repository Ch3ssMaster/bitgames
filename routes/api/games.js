const express = require("express");
const router = express.Router();

// Model
// const User = require("../../models/Product");
const Product = require("../../models/Product");

// @route GET api/users
// @desc GET All users
// @access Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ title: 1 })
    .then((products) => res.json(products));
});

// @route  POST api/users
// @desc   Create a POST
// @access Public
// router.post("/", (req, res) => {
//   const newUser = new User({
//       name: req.body.name,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       password: req.body.password,
//   });
//   newUser.save().then(user => res.json(user));
// });

module.exports = router;
