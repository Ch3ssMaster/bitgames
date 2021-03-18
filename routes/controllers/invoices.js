const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/token-utils");
// Token Security
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secretKey").secretKey;

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Purchase.find({ purchaser: id })
    .sort({ purchasedAt: -1 })
    .lean()
    .then((invoices) => {
      let purchasedProducts = [];
      invoices.forEach((element) => {
        element.products.forEach((productId) => {
          purchasedProducts.push(productId);
        });
      });
      let uniqueProducts = [];
      purchasedProducts.forEach((code) => {
        if (!uniqueProducts.includes(code)) uniqueProducts.push(code);
      });
      // console.log(purchasedProducts);
      // console.log(uniqueProducts);
      Product.find({ _id: { $in: uniqueProducts } })
        .sort({ title: -1 })
        .lean()
        .then((products) => {
          User.find({ _id: id })
            .lean()
            .then((result) => {
              var data = { userData: result };
              let titles = [];
              invoices.forEach((receipt) => {
                receipt.products.forEach((code) => {
                  products.forEach((product) => {
                    if (product._id == code) {
                      if (!titles.includes(product.title))
                        titles.push(product.title);
                    }
                  });
                });
                receipt.titles = titles;
                titles = [];
              });
              console.log(invoices);
              res.render("invoices", {
                invoices,
                data,
                products,
                includeCart: false,
                id,
                profile: true,
              });
            });
        });
    });
});

module.exports = router;
