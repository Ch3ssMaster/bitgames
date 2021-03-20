// Schemas for MongoDB
const mongoose = require("mongoose");
// Server port
const port = process.env.PORT || 5000;
module.exports = {
  mongoose,
  mongoURI: "mongodb://localhost:27017/bitgames",
  port,
};
