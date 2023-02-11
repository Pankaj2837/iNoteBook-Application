const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "jai@shree&krishna$radheradhe";

//Route 1 : create a user using : POST "api/auth/createuser" dosen't required Auth
router.post(
  "/createuser",
  [
  // name must be at least 5 chars long
  body("name").isLength({ min: 5 }),
  // email must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // check whether the user exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authenticationKey = jwt.sign(data, JWT_SECRET);
      success=true;
      console.log(authenticationKey);
      res.json({success, authenticationKey });
      //   res.json({ user });
    } catch (error) {
      console.error(success,error.message);
      res.status(500).send("some error occured");
    }
  }
);

//Route 2 : authenticate user using : POST "api/auth/login" dosen't required Auth

router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    console.log(req.body);
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success:false,error: "sorry user doesn't exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success:false, error: "sorry password doesn't match" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const awthtocken = jwt.sign(payload, JWT_SECRET);
      success=true;
      res.json({success,awthtocken});
    } catch (error) {
      console.error(success,error.message);
      await res.status(500).send({success:false,error:"Internal server error"});
    }
  }
);

//Route 3 : authenticate user using : POST "api/auth/getuser"  required Auth

router.post("/getuser",fetchuser(), async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      await res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
