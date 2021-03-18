const express = require("express");
const router = express.Router();
// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;
// Models
const Product = require("../../models/Product");

// @route GET / (Vendor)
// @desc GET All products (Products endpoint)
// @access Private (token access)

router.get("/:id", (req, res) => {
  let authcookie = req.cookies.authcookie;
  let id = req.params.id;

  jwt.verify(authcookie, secretKey, (err) => {
    // if (err) {
    //   console.log(err);
    //   res.redirect("/");
    // } else {
    let order = {};
    switch (req.query.view) {
      case "title":
        publisher = { title: -1 };
        break;
      case "publisher":
        order = { publisher: -1 };
        break;
      case "price":
        order = { price: -1 };
        break;
      default:
        order = { title: 1 };
        break;
    }
    Product.find()
      .sort(order)
      .then((result) => {
        res.render("vendor", { allGames: result, id, addProducts: true });
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  });
});

module.exports = router;
