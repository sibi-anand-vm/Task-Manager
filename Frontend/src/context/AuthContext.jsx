import { createContext,useContext } from "react";
import { useEffect,useState } from "react";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,token:null,isLoading:true,isLoggedIn:false
    })
    
    const validateToken=async(currentToken)=>{
        try{
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/validate`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${currentToken}`
            }
        })
        if(res.ok){
            return true;
        }
        else return false;
    }
    catch(err){
        return false;
    }
    }

    useEffect(()=>{
        const initializeAuth=async()=>{
            try{
            let currentToken=localStorage.getItem("token");
            let currentUser=JSON.parse(localStorage.getItem("user"));
            if(currentToken){
                const validToken=await validateToken(currentToken);
                if(validToken){
                setAuth({token:currentToken,user:currentUser,isLoading:false,isLoggedIn:true})
                }
                else{
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setAuth({token:null,user:null,isLoading:false,isLoggedIn:false})
                }
            }
            else{
                setAuth({token:null,user:null,isLoading:false,isLoggedIn:false})
            }
        }
        catch(err){
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        setAuth({token:null,user:null,isLoading:false,isLoggedIn:false})
        }
        }
        initializeAuth();
    },[])

    const login=({user,token})=>{
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
        setAuth({token:token,user:user,isLoading:false,isLoggedIn:true})
    }
    const logout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuth({token:null,user:null,isLoading:false,isLoggedIn:false})
    }

    return(
        <AuthContext.Provider value={{auth,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth=()=>useContext(AuthContext);
