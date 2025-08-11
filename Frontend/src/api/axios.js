import axios from 'axios'
let api=axios.create({
    "baseURL":import.meta.env.VITE_BACKEND_URL,
    headers:{
    "Content-Type":"application/json"
    }
})

api.interceptors.request.use(
    (config)=>{
    let token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
},
(error) => Promise.reject(error)
);

export default api;
