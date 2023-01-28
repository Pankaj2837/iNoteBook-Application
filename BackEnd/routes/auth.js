const User = require('../models/User');
const express = require('express');
const router = express.Router();
//create a user using : POST "api/auth/" dosen't required Auth 
router.post('/',(req,res)=>{
    const user = User(req.body);
    user.save();
    res.send(req.body);
})
module.exports = router;