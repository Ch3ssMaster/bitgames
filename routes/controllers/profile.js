const express = require("express");
const router = express.Router();
// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;
// Models
const User = require("../../models/User");

// @route GET /user/:id/logout (Logout)
// @desc Logout for actual user
// @access Private (token access)
router.get("/:id/logout", security.verifyToken, (req, res) => {
  const authcookie = req.cookies.authcookie;
  const id = req.params.id;
  jwt.verify(authcookie, secretKey, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      let paths = ["/user/", "/store/", "/invoices/"];
      security.deleteCookies(res, paths);
      res.redirect("/");
    }
  });
});

// @route GET /user/:id (User Profile)
/* @desc Shows user profile and enables to change
 * name, lastname, and password.
 * Links to invoices page and store page.
 */
// @access Private (token access)
router.get("/:id", security.verifyToken, (req, res) => {
  const authcookie = req.cookies.authcookie;
  const id = req.params.id;
  jwt.verify(authcookie, secretKey, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      User.find({ _id: id })
        .lean()
        .then((result) => {
          if (
            Object.keys(req.query).length === 0 &&
            req.query.constructor === Object
          ) {
            var data = {
              userData: result,
            };
          } else {
            var data = {
              userData: result,
              query: req.query,
            };
          }
          res.render("profile", {
            data,
            includeCart: false,
            profile: false,
            id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// @route POST /user/:id (User Profile)
/* @desc Save the changes for the user profile
 * and enables to change
 * name, lastname, and password.
 * Links to invoices page and store page.
 */
// @access Private (token access)
router.post("/:id", (req, res) => {
  if (req.body.updateUserData === "true") {
    var query = "&data=userData";
    var data = {
      name: req.body.userName,
      lastname: req.body.userLastName,
    };
  } else {
    var query = "&data=passwordData";
    var data = {
      password: req.body.newPassword,
    };
  }
  User.updateOne(
    { _id: req.params.id },
    {
      $set: data,
    }
  )
    .then((result) => {
      const URL = "/user/".concat(
        `${req.params.id}`,
        "?updated=",
        `${result.ok}`,
        query
      );
      res.redirect(URL);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
