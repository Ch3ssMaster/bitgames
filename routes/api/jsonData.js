const express = require("express");
const router = express.Router();

// @route GET /api/games (All games in JSON format)
/* @desc returns a JSON object
 * with all the games registered in the database.
 */
// @access Public

router.get("/games", (req, res) => {
  Product.find()
    .sort({ title: 1 })
    .then((products) => {
      res.json(products);
    });
});

// @route GET /api/games (All games in JSON format)
/* @desc returns a JSON object
 * with all the users registered in the database.
 */
// @access Public

router.get("/users", (req, res) => {
  User.find()
    .sort({ lastname: 1 })
    .then((users) => res.json(users));
});

module.exports = router;
