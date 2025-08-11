const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"This name field is required"]
    },
    usermail:{
        type:String,
        required:[true,"This mail field is required"]
    },
    password:{
        type:String,
        required:[true,"This password field is required"]
    },
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);