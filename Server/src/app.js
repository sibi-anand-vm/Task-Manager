const express=require('express')
const dotenv=require('dotenv')
dotenv.config();
const connectDB=require('./config/DBConnector');
const userRoutes=require("./routes/userRoutes");
const taskRoutes=require("./routes/taskRoutes");
const authRoutes=require("./routes/authRoutes");
// const fileRoutes=require("./routes/fileRoutes");
const errorHandler = require('./middleware/errorHandler');
const validateToken = require('./middleware/validateToken');
const cors=require('cors')

const app=express();

let PORT=process.env.PORT || 5000;
connectDB();

app.use(express.json())

app.use(cors({
    origin:"*",
    credentials:true
}))


// inside your Express app
app.get("/health", (req, res) => {
    res.status(200).send("ok");
  });
  
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/tasks",validateToken,taskRoutes);
// app.use("/api/files/",validateToken,fileRoutes);
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on PORT:${PORT}`);
})