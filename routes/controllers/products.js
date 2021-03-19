const express = require("express");
const router = express.Router();
// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;

// @route GET /product/:id/new (Add a product)
/* @desc Saves a new product in the database.
 * Links vendor and profile page.
 */
// @access Private (token access)

router.get("/:id/new", (req, res) => {
// router.get("/:id/new", security.verifyToken, (req, res) => {
  const id = req.params.id;
  // const authcookie = req.cookies.authcookie;
  // jwt.verify(authcookie, secretKey, (err) => {
    //   if (err) {
    //     console.log(err);
    //     res.redirect("/");
    //   } else {
  console.log('running!');
    res.render("product", {
      includeCart: false,
      id,
      profile: true,
    });
    //   }
  // });
});

// @route GET /product/:id (Edit product)
/* @desc Shows user invoices.
 * Links to invoices page and store page.
 */
// @access Private (token access)

// router.get("/:id", security.verifyToken, (req, res) => {
//   const id = req.params.id;
//   const authcookie = req.cookies.authcookie;
//   jwt.verify(authcookie, secretKey, (err) => {
//     if (err) {
//       console.log(err);
//       res.redirect("/");
//     } else {
//       Purchase.find({ purchaser: id })
//         .sort({ purchasedAt: -1 })
//         .lean()
//         .then((invoices) => {
//           let purchasedProducts = [];
//           invoices.forEach((element) => {
//             element.products.forEach((productId) => {
//               purchasedProducts.push(productId);
//             });
//           });
//           let uniqueProducts = [];
//           purchasedProducts.forEach((code) => {
//             if (!uniqueProducts.includes(code)) uniqueProducts.push(code);
//           });
//           Product.find({ _id: { $in: uniqueProducts } })
//             .sort({ title: -1 })
//             .lean()
//             .then((products) => {
//               User.find({ _id: id })
//                 .lean()
//                 .then((result) => {
//                   var data = { userData: result };
//                   let titles = [];
//                   invoices.forEach((receipt) => {
//                     receipt.products.forEach((code) => {
//                       products.forEach((product) => {
//                         if (product._id == code) {
//                           if (!titles.includes(product.title))
//                             titles.push(product.title);
//                         }
//                       });
//                     });
//                     receipt.titles = titles;
//                     titles = [];
//                   });
//                   console.log(invoices);
//                   res.render("invoices", {
//                     invoices,
//                     data,
//                     products,
//                     includeCart: false,
//                     id,
//                     profile: true,
//                   });
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
// });

module.exports = router;
