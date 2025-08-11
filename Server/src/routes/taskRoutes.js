const express=require('express');
const {createTask,getTaskForUser,deleteTask, editTask} = require('../controllers/taskController');
let router=express.Router();
router.get("/",getTaskForUser);
router.post("/",createTask); 
router.patch("/:id",editTask); 
router.delete("/:id",deleteTask); 
module.exports=router;