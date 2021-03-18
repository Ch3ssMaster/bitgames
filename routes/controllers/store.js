const express = require("express");
const router = express.Router();
// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;
// Models
// const User = require("../../models/User");
const Purchase = require("../../models/Purchases");

// @route GET /store/:id (Shopping card page)
/* @desc Enables the user to buy
 * the products by "Add to cart" button
 * or doing drag and drop in the product card.
 * Link to profile page.
 */
// @access Private (token access)
router.get("/:id", (req, res) => {
  const authcookie = req.cookies.authcookie;
  const id = req.params.id;
  jwt.verify(authcookie, secretKey, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Product.find()
        .sort({ title: -1 })
        .then((result) =>
          res.render("store", {
            allGames: result,
            includeCart: true,
            id,
            linkToProfile: true,
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// Save store
// @route POST /store/:id (Shopping card page)
/* @desc saves the selected products
 * in the shopping cart.
 * Link to profile page.
 */
// @access Private (token access)
router.post("/:id", (req, res) => {
  const authcookie = req.cookies.authcookie;
  const id = req.params.id;
  jwt.verify(authcookie, secretKey, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      let purchaseData = req.body.purchased.split(",");
      const price = purchaseData.pop();
      const data = {
        purchaser: id,
        products: purchaseData,
        price: price,
      };
      const purchase = new Purchase(data);
      purchase
        .save()
        .then(() => {
          Product.find()
            .sort({ title: -1 })
            .then((result) =>
              res.render("store", {
                allGames: result,
                includeCart: true,
                id,
                success: true,
                linkToProfile: true,
              })
            )
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          Product.find()
            .sort({ title: -1 })
            .then((result) =>
              res.render("store", {
                allGames: result,
                includeCart: true,
                id,
                success: false,
                linkToProfile: true,
              })
            )
            .catch((err) => {
              console.log(err);
            });
        });
    }
  });
});

module.exports = router;
