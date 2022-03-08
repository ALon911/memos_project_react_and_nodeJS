const jwt = require("jsonwebtoken");
const User = require('../models/user');
const mongoose = require("mongoose");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const isAdmin = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];


    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      req.user = decoded;
      var specificUser = await User.find({_id: req.user.user_id});
      console.log(specificUser);
      if (specificUser[0].userType != 'admin'){
        return res.status(403).send("Forbidden , you are not an Admin");
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };


module.exports = isAdmin;