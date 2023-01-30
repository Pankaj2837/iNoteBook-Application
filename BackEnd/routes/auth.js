const User = require("../models/User");
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const bodyParser = require("body-parser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const app = express();
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
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether the user exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({
      //       error: "please enter a unique value",
      //       message: err.message,
      //     });
      //   });
      const data = {
        user:{
            id : user.id
        }
      }
      const authenticationKey = jwt.sign(data,JWT_SECRET);
      console.log(authenticationKey);
      res.json({ authenticationKey });
     //   res.json({ user });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
//Route 2 : authenticate user using : POST "api/auth/login" dosen't required Auth
app.use(express.urlencoded({extended:true}));
app.use(express.json());
router.post(
    "/login",
    [
      body("email","enter valid email").isEmail(),
      body("password", "password can't be blank").exists(),
    ],
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = res.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"sorry user doesn't exist"});
            }
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"sorry password doesn't match"});
            }
            const payload = {
                user :{
                    id:user.id
                }
            }
            const awthtocken = jwt.sign(payload,JWT_SECRET);
            res.json(awthtocken);
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })

    //Route 3 : 
    // try {
    //   const userTd = "todo";
    //   const user = await User.findById(userTd).select(".password");
    // } catch (error) {
    //  console.log(error.message) ;
    //  res.ststus(400).send("Internal server Error");
    // }
module.exports = router;
