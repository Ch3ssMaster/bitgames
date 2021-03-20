const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
router.use(fileUpload());

// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;

// Models
const User = require("../../models/Product");

// @route GET /product/:id/new (Add a product)
/* @desc Shows the view to save a new product in the database.
 * Links to vendor.
 */
// @access Private (token access)

// router.get("/:id/new", security.verifyToken, (req, res) => {
router.get("/:id/new", (req, res) => {
  const id = req.params.id;
  const authcookie = req.cookies.authcookie;
  // jwt.verify(authcookie, secretKey, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/");
  //   } else {
  res.render("product", {
    includeCart: false,
    id,
    profile: true,
    viewProducts: true,
    toUpdate: false,
  });
  // }
  // });
});

// @route GET /product/:id?edit=productId (Update a product)
/* @desc Shows the view to update a product saved in the database.
 * Links to vendor.
 */
// @access Private (token access)

// router.get("/:id", security.verifyToken, (req, res) => {
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const productId = req.query.edit;
  const authcookie = req.cookies.authcookie;
  // jwt.verify(authcookie, secretKey, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/");
  //   } else {
  Product.findOne({ _id: productId })
    .lean()
    .then((result) => {
      console.log(result);
      res.render("product", {
        includeCart: false,
        id,
        productId,
        profile: true,
        saved: false,
        viewProducts: true,
        duplicateTitle: false,
        updateAlert: false,
        toUpdate: true,
        updated: false,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("product", {
        includeCart: false,
        id,
        productId,
        profile: true,
        saved: false,
        viewProducts: true,
        duplicateTitle: false,
        updateAlert: false,
        toUpdate: true,
        updated: false,
        data: result,
      });
    });
  // }
  // });
});

// @route POST /product/:id/new (Save a new  product)
/* @desc Saves a new product in the database.
 * Links to vendor (all products).
 */
// @access Private (token access)

// router.post("/:id/new", security.verifyToken, (req, res) => {
router.post("/:id/new", (req, res) => {
  const id = req.params.id;
  const authcookie = req.cookies.authcookie;
  // jwt.verify(authcookie, secretKey, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/");
  //   } else {
  let toSaveCover = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    // return res.status(400).send("No files were uploaded.");
    toSaveCover = "default-cover.jpg";
  } else {
    // Get img and set route to save it
    let gameCover = req.files.fileIMG;
    let uploadPath = "./public/img/" + gameCover.name;
    toSaveCover = gameCover.name;
    gameCover.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      // res.send("File uploaded!");
    });
  }

  let publiser = "";
  switch (req.body.publisher) {
    case "0":
      publiser = "Rockstar Games";
      break;
    case "1":
      publiser = "Electronic Arts";
      break;
    case "2":
      publiser = "Eko Software";
      break;
    case "3":
      publiser = "Ubisoft";
      break;
    default:
      publiser = "Unknown publiser";
      break;
  }
  const data = {
    title: req.body.title,
    publisher: publiser,
    description: req.body.description,
    img: { localImg: toSaveCover, coverImg: req.body.linkIMG },
    price: req.body.price,
  };
  const product = new Product(data);
  product
    .save()
    .then((result) => {
      console.log(result);
      res.render("product", {
        includeCart: false,
        id,
        profile: true,
        viewProducts: true,
        saved: true,
      });
    })
    .catch((err) => {
      console.log(err);
      if ((err.code = 11000)) {
        res.render("product", {
          includeCart: false,
          id,
          profile: true,
          saved: false,
          duplicateTitle: true,
          viewProducts: true,
          data,
        });
      }
    });
  //   }
  // });
});

// @route GET /product/:id?edit=productId (Update a product)
/* @desc Shows the view to update a product saved in the database.
 * Links to vendor.
 */
// @access Private (token access)

// router.post("/:id", security.verifyToken, (req, res) => {
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const productId = req.query.edit;
  const authcookie = req.cookies.authcookie;
  // jwt.verify(authcookie, secretKey, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/");
  //   } else {
  let toSaveCover = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    // return res.status(400).send("No files were uploaded.");
    toSaveCover = "default-cover.jpg";
  } else {
    // Get img and set route to save it
    let gameCover = req.files.fileIMG;
    let uploadPath = "./public/img/" + gameCover.name;
    toSaveCover = gameCover.name;
    gameCover.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      // res.send("File uploaded!");
    });
  }

  let publiser = "";
  switch (req.body.publisher) {
    case "0":
      publiser = "Rockstar Games";
      break;
    case "1":
      publiser = "Electronic Arts";
      break;
    case "2":
      publiser = "Eko Software";
      break;
    case "3":
      publiser = "Ubisoft";
      break;
    default:
      publiser = "Unknown publiser";
      break;
  }
  const data = {
    title: req.body.title,
    publisher: publiser,
    description: req.body.description,
    img: { localImg: toSaveCover, coverImg: req.body.linkIMG },
    price: req.body.price,
  };
  Product.findByIdAndUpdate(productId, { $set: data }).then((result) => {
    console.log(result);
    Product.findOne({ _id: productId })
      .lean()
      .then((result) => {
        console.log(result);
        res.render("product", {
          includeCart: false,
          id,
          productId,
          profile: true,
          saved: false,
          viewProducts: true,
          duplicateTitle: false,
          updateAlert: true,
          toUpdate: true,
          updated: true,
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("product", {
          includeCart: false,
          id,
          productId,
          profile: true,
          saved: false,
          viewProducts: true,
          duplicateTitle: false,
          updateAlert: true,
          toUpdate: true,
          updated: false,
          data: result,
        });
      });
    // console.log(result);
    // res.render("product", {
    //   includeCart: false,
    //   id,
    //   profile: true,
    //   viewProducts: true,
    //   saved: true,
    // });
  });

  // }
  // });
});

module.exports = router;
