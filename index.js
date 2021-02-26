const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");

const app = express();

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
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
