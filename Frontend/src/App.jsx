import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { useAuth,AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Loading from './components/Loading/Loading'

const ProtoctedRoute=({children})=>{
  let {auth}=useAuth();

  if(auth.isLoading){
    return(
      <Loading />
    )
  }

  return(
  auth.user ? children : <Navigate to="/" />
  )
}

function App() {
  return (
    <BrowserRouter>
       <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={
        <ProtoctedRoute>
        <HomePage />
        </ProtoctedRoute>} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

