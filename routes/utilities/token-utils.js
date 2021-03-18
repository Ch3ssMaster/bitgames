// Token Security
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secretKey").secretKey;
const jwt_decode = require("jwt-decode");

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
module.exports = security = { jwt, secretKey, jwt_decode, verifyToken };
