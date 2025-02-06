const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); //used from express validator
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'crazyboy'

// Route 1: For creating new user
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("fullname", "atleast 3 letters").isLength({ min: 3 }),
    body("password", "atleast 5 letters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // to check whether the input is valid or not

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exits" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: secPass,
      });
      
      const data = {
        user:{
            id: user.id
        }
      }

      var token = jwt.sign(data, JWT_SECRET);
      res.json({token})


    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

// Route 2: For user login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter your password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Validate input
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }

      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passCompare) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, JWT_SECRET); 
      res.json({ token });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error occurred" });
    }
  }
);

// Route 3 : Get user detail
router.post("/getuser",fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
      res.status(500).json({ error: "Some error occurred" });        
    }
}
  );
  

module.exports = router;

