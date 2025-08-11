const express=require("express");
const validateToken = require("../middleware/validateToken");

const router=express.Router();

router.get("/validate", validateToken, (req, res) => {
    res.json({ message: "You are authenticated", user: req.user });
  });
  
module.exports=router;