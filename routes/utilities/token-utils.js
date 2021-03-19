// Token Security
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secretKey").secretKey;
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//  FORMAT OF TOKEN: Cookie
const verifyToken = (req, res, next) => {
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
};

const generateCookies = (token, res, paths) => {
  paths.forEach((route) => {
    res.cookie("authcookie", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      path: route,
    });
  });
};

const deleteCookies = (res, paths) => {
  paths.forEach((route) => {
    res.clearCookie("authcookie", { httpOnly: true, path: route });
  });
};

module.exports = security = {
  jwt,
  secretKey,
  jwt_decode,
  cookieParser,
  bcrypt,
  verifyToken,
  generateCookies,
  deleteCookies,
};
