const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("express-handlebars");
// const users = require("./routes/api/users");
const games = require("./routes/api/games");

const app = express();

// Handlebars Middleware
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/db").mongoURI;

// DB connection
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
// Static folder
app.use(express.static(path.join(__dirname, "public")));

// app.use('/api/users', users);
app.use("/api/games", games);

// Homepage route
app.use("/", (req, res) => {
  // let css = [{css:'/css/style.css'}]
  // let scripts = [{script:'/javascript/javascript.js'}];
  res.render("index");
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

