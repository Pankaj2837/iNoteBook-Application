const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj ={
        a:'this',
        number:6
    }
    console.log(req.body);
    res.json(obj);
})
module.exports = router;