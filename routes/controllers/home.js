const express = require("express");
const router = express.Router();
// Token Security
const security = require("../utilities/token-utils");
const jwt = security.jwt;
const secretKey = security.secretKey;
const bcrypt = security.bcrypt;
// Models
const User = require("../../models/User");
var moment = require("moment-timezone");

// @route GET / (Home)
// @desc GET All products (login-register endpoint)
// @access Public

router.get("/", (req, res) => {
  Product.find()
    .sort({ title: -1 })
    .then((result) => res.render("home", { allGames: result }))
    .catch((err) => {
      console.log(err);
    });
});

// @route POST / (Home)
// @desc Validate or create a new user
// @access Private (token access)

router.post("/", (req, res) => {
  if (req.body.email && req.body.password) {
    User.find({ newEmail: req.body.email })
      .lean()
      .then((user) => {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (result) {
            userData = user[0];
            jwt.sign({ userData }, secretKey, (err, token) => {
              let paths = [];
              switch (userData.role) {
                case 0:
                  paths = ["/admin/", "/user/", "/store/", "/invoices/"];
                  break;
                case 1:
                  paths = ["/vendor/", "/user/", "/store/", "/invoices/"];
                  break;

                default:
                  paths = ["/user/", "/store/", "/invoices/"];
                  break;
              }
              let URL = paths[0].concat(`${userData._id}`);
              security.generateCookies(token, res, paths);
              res.redirect(URL);
            });
          } else {
            Product.find()
              .sort({ title: -1 })
              .then((result) => {
                result.push(req.body);
                result.push({ notFound: "password not found" });
                res.render("home", { allGames: result });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        Product.find()
          .sort({ title: -1 })
          .then((result) => {
            result.push(req.body);
            result.push({ notFound: "email not found" });
            res.render("home", { allGames: result });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  } else {
    const data = {
      name: req.body.username,
      lastname: req.body.lastname,
      newEmail: req.body.newEmail,
      password: req.body.inputPassword,
      role: 2,
      createdAt: moment().tz("Europe/Madrid").format("DD/MM/YYYY HH:mm"),
    };
    const user = new User(data);
    user
      .save()
      .then((user) => {
        const userData = user;
        jwt.sign({ userData }, secretKey, (err, token) => {
          let cookieLifetime = 60 * 60 * 24 + 3600;
          // let cookieLifetime = (3600);
          res.cookie("authcookie", token, {
            maxAge: cookieLifetime,
            httpOnly: true,
            path: "/user/",
          });
          const URL = "/user/".concat(`${userData._id}`);
          res.redirect(URL);
        });
      })
      .catch((err) => {
        console.log(err);
        Product.find()
          .sort({ title: -1 })
          .then((result) => {
            result.push(req.body);
            result.push({
              userValidation: "The email already exists in the database.",
            });
            res.render("home", { allGames: result });
            // console.log(err);
            // res. status(400).send('unable to save to database')
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
});

module.exports = router;
