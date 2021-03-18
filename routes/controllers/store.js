const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/token-utils");
// Token Security
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secretKey").secretKey;
// Models
const Purchase = require("../../models/Purchases");

// Store
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Product.find()
      .sort({ title: -1 })
      .then((result) =>
        res.render("store", { allGames: result, includeCart: true, id, linkToProfile: true })
      );
  });
  
  // Save store
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    let purchaseData = req.body.purchased.split(",");
    // console.log(purchaseData);
    const price = purchaseData.pop();
    // console.log(price);
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
          );
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
          );
      });
  });

  module.exports = router;