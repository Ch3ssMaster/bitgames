// Express generator
const express = require("express");
const app = express();

// Schemas for MongoDB
const mongoose = require("mongoose");

// Security modules
const cookieParser = require("./routes/utilities/token-utils").cookieParser;

// Static routes
const path = require("path");

// Controllers
const home = require("./routes/controllers/home");
const profile = require("./routes/controllers/profile");
const store = require("./routes/controllers/store");
const invoices = require("./routes/controllers/invoices");
const vendor = require("./routes/controllers/vendor");
const products = require("./routes/controllers/products");

// JSON API
const api = require("./routes/api/jsonData");

// Views
const hbs = require("express-handlebars");

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
helpersHbs.handlebars.registerHelper("formatDate", function (value) {
  let newDate = value.toString().split("GMT")[0];
  return newDate;
});
helpersHbs.handlebars.registerHelper("incrementIndexValue", function (value) {
  return value + 1;
});
helpersHbs.handlebars.registerHelper("isdefined", function (value) {
  return value !== undefined;
});
helpersHbs.handlebars.registerHelper("checkDeleted", function (value) {
  if (Object.keys(value).length > 0) {
    return true;
  } else {
    return false;
  }
});
helpersHbs.handlebars.registerHelper("deletedResult", function (value) {
  if (value.ok == 1 && value.deletedCount == 1) {
    return true;
  } else {
    return false;
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

// Get JSON with all products
app.use("/api/", api);

// Homepage route
app.use("/", home);

// Profile user route
app.use("/user", profile);

// Purchases route
app.use("/store", store);

// Invoices route
app.use("/invoices", invoices);

// Vendor route
app.use("/vendor", vendor);

// Products management route
app.use("/product", products);

// Server port
const port = process.env.PORT || 5000;

// DB connection
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.log(err));
