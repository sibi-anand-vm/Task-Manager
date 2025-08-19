import React, { useEffect, useState } from 'react'
import ShowTaskButtonGroup from '../components/Buttons/ShowTaskButtonGroup';
import TaskSearchBar from '../components/Search/TaskSearchBar';
import TaskCard from '../components/Card/TaskCard';
import { useAuth } from '../context/AuthContext';
import { ToastContainer,toast } from 'react-toastify';
import Loading from '../components/Loading/Loading';
import AddTaskForm from '../components/Forms/Task/AddTaskForm';

function HomePage() {
  const [showTaskState,setShowTaskState]=useState("all");
  const [isLoading,setLoading]=useState(true);
  const [isAddBtnClicked,setAddBtnClicked]=useState(false);
  const [searchKey,setSearchKey]=useState("");
  const [tasks,setTasks]=useState([]);
  const [filteredTasks,setFilteredTasks]=useState([]);
  const [isDelete,setIsDelete]=useState(null);
  const {auth}=useAuth();

  useEffect(()=>{

    let filtered=[...tasks];

    if(showTaskState==="Completed"){
      filtered=filtered.filter((task)=>task.status.toLowerCase()==="completed")
      }
    else if(showTaskState==="Ongoing"){
      filtered=filtered.filter((task)=>task.status.toLowerCase()==="ongoing")
    }
    if(searchKey.trim()){
      filtered=filtered.filter((task)=>task.taskname.toLowerCase().includes(searchKey.toLowerCase()))
    }
    setFilteredTasks(filtered);
  },[searchKey,showTaskState,tasks])

  useEffect(() => {
    if (!auth?.token) return; 
    const fetchTasks = async () => {
      try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
          }
        });

        const data = await res.json();
        if (res.ok) {
          setTasks(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch tasks:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user tasks", err);
      }
    };
    fetchTasks();
  }, [auth?.token]);
  useEffect(()=>{
    if(!isDelete) return;

    const deleteTask=async(deleteID)=>{
      try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${deleteID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
          }
        });
  
        const data = await res.json();
        if (res.ok) {
          setTasks((prev)=>prev.filter((task)=>deleteID!==task._id))
          setIsDelete(null);
          toast.success("Task Deleted Successfully")
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    deleteTask(isDelete) 
  },[isDelete])

  const handleEdit=async(taskKey,draft)=>{
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskKey}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
        body:JSON.stringify({taskForm:draft})
      });

      const data = await res.json();
      if (res.ok) {
        setTasks((prev)=>prev.map((task)=>task._id===taskKey? {...task,...draft}:task));
        toast.success("Task Edited Successfully")
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  
  }

  const handleAddTask=async(taskForm)=>{
    if(!taskForm.taskname || !taskForm.deadline){
      toast.warning("Fill Minimum required fields")
      return;
    }

    try{
      let token=auth.token;
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({taskForm})
      })
      let data=await res.json();
      if(res.ok){
        setTasks((prev)=>{
          return [...prev,data.newTask];
        })
        toast.success("Task Added successfully");
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
    setAddBtnClicked(false);
  }
  return (
    <div>
      <ToastContainer />
      <TaskSearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
      {isAddBtnClicked ? (
  <div className="p-4 bg-white shadow-lg rounded-xl w-full max-w-5xl mx-auto">
    <AddTaskForm onSubmitAddTask={handleAddTask} setAddBtnClicked={setAddBtnClicked} />
  </div>
) : (
  <div className="flex justify-center items-center py-8">
    <button 
      onClick={() => setAddBtnClicked(true)}
      className="px-6 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all duration-200"
    >
      ➕ Add Task
    </button>
  </div>
)}

      <ShowTaskButtonGroup setShowTaskState={setShowTaskState} />
      <div className="flex flex-wrap justify-center items-start gap-4">
        {isLoading && <Loading />}
  {filteredTasks && filteredTasks.length > 0 ? (
    filteredTasks.map((task, index) => (
      <TaskCard task={task} setIsDelete={setIsDelete} key={task._id || index} taskKey={task._id || index}  onSave={handleEdit}/>
    ))
  ) : (
    <p className="text-gray-500">No tasks found</p>
  )}
</div>
    </div>
  )
}
export default HomePage;
