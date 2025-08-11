const express=require('express');
const {registerUser,loginUser, getUsers} = require('../controllers/userController');
const validateToken=require('../middleware/validateToken')

const router=express.Router();

router.get('/',validateToken,getUsers).post('/',registerUser)
router.post("/login",loginUser);

module.exports=router;