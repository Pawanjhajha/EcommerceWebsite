import {useState,useEffect} from"react"
import {useAuth} from"../../context/Auth"
import {Outlet} from "react-router-dom"
import Spiner from "../Spiner"

export default function PrivateRoute(){
    const [ok,setOk]=useState(false)
    const {auth,setAuth}=useAuth()

    //retrive private router
    useEffect(()=>{
        const authCheck=async()=>{
            fetch('/api/v1/user/user-auth',{
                headers:{
                    //auth? means first check the condition then process forward
                    "Authorization":auth?.token
                }
            }).then((result)=>{ return result.json()}).then((data)=>{
                
                if(data.ok){
                    setOk(true)
                }else{
                    setOk(false)
                }
            })
        }
        //if token recieve then call the function
        if(auth?.token){
            authCheck()
        }
    },[auth?.token])

    return ok ? <Outlet/>: <Spiner/>
}