const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
var moment = require("moment-timezone");
const Product = require("./models/Product");
const Purchase = require("./models/Purchases");
const User = require("./models/User");
const apiGames = require("./routes/api/games");
const rand = require("random-key");
const cookieParser = require("cookie-parser");
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcrypt");

const app = express();

// Handlebars Middleware
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var helpersHbs = hbs.create({});

// Cookie Parser
app.use(cookieParser());

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded());

// Custom Handlebar Helpers

// helpersHbs.handlebars.registerHelper("userError", function () {
//   var fireEvent = "$('#error-user').modal('show')";
//   return fireEvent;
// });
helpersHbs.handlebars.registerHelper("switch", function (value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

helpersHbs.handlebars.registerHelper("case", function (value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

helpersHbs.handlebars.registerHelper("default", function (value, options) {
  if (this.switch_break == false) {
    return value;
  }
});
helpersHbs.handlebars.registerHelper("checkPostUpdated", function (value) {
  if (value["query"]) {
    return true;
  }
});
helpersHbs.handlebars.registerHelper("checkUpdated", function (value) {
  if (value.query.updated == 1) {
    return true;
  }
});
helpersHbs.handlebars.registerHelper("checkUpdatedPassword", function (value) {
  if (value.query.data == "passwordData") {
    return true;
  }
});
helpersHbs.handlebars.registerHelper("notFound", function (value) {
  const lastItem = value.pop();
  value.push(lastItem);
  if (
    lastItem.notFound == "password not found" ||
    lastItem.notFound == "email not found"
  ) {
    return true;
  } else {
    return false;
  }
});
helpersHbs.handlebars.registerHelper("userValidation", function (value) {
  const lastItem = value.pop();
  const userData = value.pop();
  value.push(userData);
  value.push(lastItem);
  if (lastItem.userValidation == "The email already exists in the database.") {
    return true;
  } else {
    return false;
  }
});
helpersHbs.handlebars.registerHelper("getFormData", function (value, option) {
  const lastItem = value.pop();
  const userData = value.pop();
  value.push(userData);
  value.push(lastItem);
  return userData[option];
});
// helpersHbs.handlebars.registerHelper("enableCart", function (value) {
//   if (value.includes("store")) {
//     return true;
//   } else {
//     return false;
//   }
// });

// DB Config
const db = require("./config/db").mongoURI;
const { title } = require("process");
const { response } = require("express");
const { request } = require("http");

// Routes
// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Key generator for jwt
// const secretKey = rand.generate();
const secretKey = ".@f/37?XDF$nU[e_";

// Return products json
app.use("/api/games", apiGames);

// Homepage route
app.get("/", (req, res) => {
  Product.find()
    .sort({ title: -1 })
    .then((result) => res.render("home", { allGames: result }));
});

// Store
app.get("/store/:id", (req, res) => {
  const id = req.params.id;
  Product.find()
    .sort({ title: -1 })
    .then((result) =>
      res.render("store", { allGames: result, includeCart: true, id })
    );
});

// Save store
app.post("/store/:id", (req, res) => {
  const id = req.params.id;
  let purchaseData = req.body.purchased;
  console.log(purchaseData);
  const price = purchaseData.length;
  console.log(price);
  const data = {
    purchaser: id,
    products: purchaseData,
    price: price,
  };
  const purchase = new Purchase(data);
  purchase.save().then(() => {
    Product.find()
      .sort({ title: -1 })
      .then((result) =>
        res.render("store", { allGames: result, includeCart: true, id })
      );
  }).catch((err)=>{
    console.log(err);
  });
});

// Login or Create New User
app.post("/", (req, res) => {
  if (req.body.email && req.body.password) {
    User.find({ newEmail: req.body.email })
      .lean()
      .then((user) => {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (result) {
              userData = user[0];
              jwt.sign({ userData }, secretKey, (err, token) => {
                let cookieLifetime = 60 * 60 * 24 + 3600;
                res.cookie("authcookie", token, {
                  maxAge: cookieLifetime,
                  httpOnly: true,
                  path: "/user/",
                });
                const URL = "/user/".concat(`${userData._id}`);
                res.redirect(URL);
              });
            } else {
              Product.find()
                .sort({ title: -1 })
                .then((result) => {
                  result.push(req.body);
                  result.push({ notFound: "password not found" });
                  res.render("home", { allGames: result });
                });
            }
          }
        );
      })
      .catch((err) => {
        Product.find()
          .sort({ title: -1 })
          .then((result) => {
            result.push(req.body);
            result.push({ notFound: "email not found" });
            res.render("home", { allGames: result });
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
          });
      });
  }
});

//  FORMAT OF TOKEN: Cookie
function verifyToken(req, res, next) {
  // Check id in cookie
  if ("authcookie" in req.cookies) {
    let decoded = jwt_decode(req.cookies.authcookie);
    if (decoded.userData._id == req.params.id) {
      //next middleware
      next();
    } else {
      res.redirect("/");
    }
  } else {
    //Forbidden access
    // res.sendStatus(403);
    res.redirect("/");
  }
}

// Profile user page
app.get("/user/:id", verifyToken, (req, res) => {
  const authcookie = req.cookies.authcookie;
  jwt.verify(authcookie, secretKey, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      User.find({ _id: req.params.id })
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
          // const logout = req.originalUrl.split("?")[0].concat("/logout");
          // const store = "/user/".concat(`${req.params.id}`);
          res.render("profile", { data, includeCart: false });
        });
    }
  });
});

// Logout
app.get("/user/:id/logout", verifyToken, (req, res) => {
  res.clearCookie("authcookie");
  res.redirect("/");
});

// Updating user profile
app.post("/user/:id", (req, res) => {
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
  ).then((result) => {
    const URL = "/user/".concat(
      `${req.params.id}`,
      "?updated=",
      `${result.ok}`,
      query
    );
    res.redirect(URL);
  });
  // console.log(req.params);
  // console.log(req.body);
  // console.log(req.query);
});

// Get error creating new user
// app.get('/:error', console.log(req.params.error))

const port = process.env.PORT || 5000;

// DB connection
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.log(err));
