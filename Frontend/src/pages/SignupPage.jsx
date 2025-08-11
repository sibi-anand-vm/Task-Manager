import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import SignupForm from '../components/Forms/Signup/SignupForm';
import {toast, ToastContainer} from 'react-toastify'

function SignupPage() {
  let navigate=useNavigate();
  let [signUpForm,setSignupForm]=useState({
    name:"",mail:"",password:""
  })
  const handleSignup=async(e)=>{
    e.preventDefault();
    if(!signUpForm.name || !signUpForm.mail || !signUpForm.password){
      toast.warning("Fill all fields")
      return;
    }
    try{
      let res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({signUpForm})
      });
      const data = await res.json();
      if(res.ok){
        toast.success(data.message)
        setTimeout(()=>{
          navigate("/")
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

  return (
    <>
    <ToastContainer />
    <SignupForm signupForm={signUpForm} setSignupForm={setSignupForm} onSubmit={handleSignup}/>
    </>
  )
}

export default SignupPage;
