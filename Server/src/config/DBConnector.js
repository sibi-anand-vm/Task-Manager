const mongoose=require('mongoose')

const connectDB=async()=>{
try{
    const connector=await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB:"+connector.connection.name);
}
catch(err){
    console.log("Error occured:"+err.message);
}
}
module.exports=connectDB;