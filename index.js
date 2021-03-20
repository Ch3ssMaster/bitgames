/* 
 * bitGames v1.0.0-alpha (https://github.com/Ch3ssMaster/bitgames)
 * Copyright 2021 Antonio Cebrián Mesa
 * Licensed under MIT (https://github.com/Ch3ssMaster/bitgames/blob/main/LICENSE.md)
 */
// Express generator
const express = require("express");
const serverApp = express();

// Security modules
const cookieParser = require("./routes/utilities/token-utils").cookieParser;

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
serverApp.engine("handlebars", hbs({ defaultLayout: "main" }));
serverApp.set("view engine", "handlebars");
var helpersHbs = hbs.create({});

// Cookie Parser
serverApp.use(cookieParser());

// Bodyparser Middleware
serverApp.use(express.json());
serverApp.use(express.urlencoded());

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
helpersHbs.handlebars.registerHelper("isEqual", function (value, option) {
  if (value == option) {
    return true;
  } else {
    return false;
  }
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
const db = require("./config/db");
// const { title } = require("process");
// const { response } = require("express");
// const { request } = require("http");

// Routes
// Static folder
serverApp.use(express.static("./public"));

// Get JSON with all products
serverApp.use("/api/", api);

// Homepage route
serverApp.use("/", home);

// Profile user route
serverApp.use("/user", profile);

// Purchases route
serverApp.use("/store", store);

// Invoices route
serverApp.use("/invoices", invoices);

// Vendor route
serverApp.use("/vendor", vendor);

// Products management route
serverApp.use("/product", products);

// DB connection
db.mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
    serverApp.listen(db.port, () =>
      console.log(`Server started on port ${db.port}`)
    );
  })
  .catch((err) => console.log(err));
