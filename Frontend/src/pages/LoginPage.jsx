import React, { useState } from 'react'
import {useNavigate,Navigate } from 'react-router-dom';
import LoginForm from '../components/Forms/Login/LoginForm';
import { useAuth } from '../context/AuthContext';
import {toast, ToastContainer} from 'react-toastify'
import Loading from '../components/Loading/Loading';

function LoginPage() {
  let {auth,login}=useAuth();
  let navigate=useNavigate();
  let [loginForm,setLoginForm]=useState({
    mail:"",password:""
  })
  const handleLogin=async(e)=>{
    e.preventDefault();
    if(!loginForm.mail || !loginForm.password){
      toast.warning("Fill all fields")
      return;
    }
    try{
      let res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({loginForm})
      });
      const data = await res.json();
      if(res.ok){
        login({token:data.token,user:data.user})
        toast.success(data.message)
        setTimeout(()=>{
          navigate("/home")
        },1000)
      }
      else{
          toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }
  if(auth.isLoading){
    return <Loading />
  }
  if (auth.isLoggedIn) {
    return <Navigate to="/home" replace />
  }

  return (
    <>
    <ToastContainer />
    <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} onSubmit={handleLogin} />
    </>
  )
}

export default LoginPage;
