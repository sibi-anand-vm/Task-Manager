const asyncHandler=require('express-async-handler')
const Task=require('../models/Task');
//@desc Create Task
//@route /api/tasks
//@access PRIVATE
const createTask=asyncHandler(async(req,res)=>{
    const {taskForm}=req.body;
    if(!taskForm.taskname || !taskForm.deadline){
        res.status(400);
        throw new Error("All task fields required");
    }
        let existingTask=await Task.find({userID:req.user.id,taskname:taskForm.taskname});
        if(existingTask.length>0){
            res.status(409);
            throw new Error("TaskName already exist");
        }
        let newTask=await Task.create({
            userID:req.user.id,
            taskname:taskForm.taskname,
            desc:taskForm.desc,
            deadline:taskForm.deadline,
            status:taskForm.status
        })
        if(newTask){
            res.status(201).json({message:"Successfully created Task",newTask})
        }
        else{
            res.status(400);
            throw new Error("Error creating Task!")
        }
    }

);

//@desc Get Task for user
//@route /api/tasks/
//@access PRIVATE
const getTaskForUser=asyncHandler(async(req,res)=>{
    let tasks=await Task.find({userID:req.user.id});
    res.status(200).json(tasks);
});

//@desc Delete Task
//@route /api/tasks/:id
//@access PRIVATE
const deleteTask=asyncHandler(async(req,res)=>{
    let task=await Task.findOne({_id:req.params.id})
    if(task){
        if(task.userID!=req.user.id){
            res.status(403);
            throw new Error("You are not authorized to delete other user Tasks")
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Deleted task Successfully"});
    }
    else{
        res.status(404);
        throw new Error("Task not Available")
    }
});

//@desc Edit Task
//@route /api/tasks/:id
//@access PRIVATE
const editTask=asyncHandler(async(req,res)=>{
    const {taskForm}=req.body;
    let taskID=req.params.id;
    if(!taskForm.taskname || !taskForm.deadline){
        res.status(400);
        throw new Error("All task fields required");
    }
    let existingTask=await Task.findOne({_id:taskID});
    if(existingTask){
        if(existingTask.userID!=req.user.id){
            res.status(403);
            throw new Error("You are not authorized to delete other user Tasks")
        }
        let editedTask=await Task.findByIdAndUpdate(taskID,taskForm,{new:true});
        res.status(200).json({message:"Edited task Successfully",editedTask});
    }
    else{
        res.status(404);
        throw new Error("Task not Available")
    }
    }

);

module.exports={createTask,getTaskForUser,deleteTask,editTask};