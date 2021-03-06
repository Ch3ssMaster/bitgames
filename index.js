const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
var moment = require("moment-timezone");
const Product = require("./models/Product");
const User = require("./models/User");
const apiGames = require("./routes/api/games");

const app = express();

// Handlebars Middleware
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var helpersHbs = hbs.create({});

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded());

//helpers
helpersHbs.handlebars.registerHelper("userError", function () {
  var fireEvent = "$('#error-user').modal('show')";
  return fireEvent;
});
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

// DB Config
const db = require("./config/db").mongoURI;
const { title } = require("process");
const { response } = require("express");
const { request } = require("http");

// Routes
// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Return products json
app.use("/api/games", apiGames);

// Homepage route
app.get("/", (req, res) => {
  if (req.query.user) {
    console.log(req.body);
  }

  Product.find()
    .sort({ title: -1 })
    .then((result) => res.render("home", { allGames: result }));
});

// Create New User
app.post("/", (req, res) => {
  const data = {
    name: req.body.username,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.inputPassword,
    role: 2,
    createdAt: moment().tz("Europe/Madrid").format("DD/MM/YYYY HH:mm"),
  };
  const user = new User(data);
  user
    .save()
    .then((user) => {
      const URL = "/user/".concat(`${user._id}`);
      res.redirect(URL);
    })
    .catch((err) => {
      var fireEvent = "$('#error-user').modal('show')";
      var errorData = {
        message: err._message,
        fire: fireEvent,
      };
      res.render("home", { errorUser: errorData });
      // console.log(err);
      // res. status(400).send('unable to save to database')
    });
});

// Profile user page
app.get("/user/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .lean()
    .then((result) => {
      // res.send(result[0].name);
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
      res.render("profile", { data });
    });
});
// Updating user profile
app.post("/user/:id", (req, res) => {
  // console.log(req.body.updateUserData);
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
