const  jwt  = require("jsonwebtoken");
const User = require('../models/userModal');
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
 
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next(); // Ensure function exits if successful
      
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // This runs only if token was not present at all
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
