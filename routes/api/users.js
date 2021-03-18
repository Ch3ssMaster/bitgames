const express = require("express");
const router = express.Router();

// @route GET api/users
// @desc GET All users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ lastname: 1 })
    .then((users) => res.json(users));
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
