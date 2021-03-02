const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const Product = require("./models/Product");
const User = require("./models/User");
const apiGames = require("./routes/api/games");

const app = express();

// Handlebars Middleware
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  Product.find()
    .sort({ title: -1 })
    .then((result) => res.render("home", { allGames: result }));
});

// Create New User
app.post("/users/profile", (req, res) => {
  const data = {
    name: req.body.username,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.inputPassword,
    role: 2,
  };
  const user = new User(data);
  user.save()
  .then(res.send('New user created')).catch(err=>{
    res.send(err)
    // res. status(400).send('unable to save to database')
  })

});

const port = process.env.PORT || 5000;

// DB connection
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.log(err));
