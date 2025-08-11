const asyncHandler=require('express-async-handler')
const User=require('../models/User');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
//@desc Register User
//@route /api/users
//@access PUBLIC
const registerUser=asyncHandler(async(req,res)=>{
    const {signUpForm}=req.body;
    if(!signUpForm.name || !signUpForm.mail || !signUpForm.password){
        res.status(400);
        throw new Error("All Auth fields required");
    }
        let existingUser=await User.findOne({usermail:signUpForm.mail});
        if(existingUser){
            res.status(409);
            throw new Error("Mail already exist");
        }
        let hashedPassword=await bcrypt.hash(signUpForm.password,10);
        let newUser=await User.create({
            username:signUpForm.name,
            usermail:signUpForm.mail,
            password:hashedPassword
        })
        if(newUser){
            res.status(201);
            res.json({message:"Successfully created User"})
        }
        else{
            res.status(400);
            throw new Error("Error creating User!")
        }
    }

);


//@desc Login User
//@route /api/login
//@access PUBLIC
const loginUser=asyncHandler(async(req,res)=>{
    const {loginForm}=req.body;
    if(!loginForm.mail || !loginForm.password){
        res.status(400);
        throw new Error("All fields required");
    }
        let existingUser=await User.findOne({usermail:loginForm.mail});
        if(!existingUser){
            res.status(401);
            throw new Error("Mail not exist");
        }
        let passMatch=await bcrypt.compare(loginForm.password,existingUser.password);
        if(passMatch){
            let token=jwt.sign({user:{
                id:existingUser._id,name:existingUser.username,usermail:existingUser.usermail
            }},process.env.JWT_SECRET_KEY,{"expiresIn":"2d"});
            res.status(200).json({message:"Login success",token,user:{id:existingUser._id,name:existingUser.username,usermail:existingUser.usermail}});
        }
        else{
            res.status(401);
            throw new Error("Invalid credentials provided")
        }
})

//@desc Get Users
//@route /api/users
//@access PRIVATE
const getUsers=asyncHandler(async(req,res)=>{
    let users=await User.find({});
    res.status(200).json(users);
})
module.exports={registerUser,loginUser,getUsers};