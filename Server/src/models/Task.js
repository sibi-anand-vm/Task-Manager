const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    taskname:{
        type:String,
        required:[true,"This name field is required"]
    },
    desc:{
        type:String
    },
    deadline:{
        type:Date,
        required:[true,"This date field is required"]
    },
    status:{
        type:String,
        default:"Pending",
        enum:["Pending","Ongoing","Completed"]
    },
},{
    timestamps:true
})

module.exports=mongoose.model("Task",taskSchema);