import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
function Spiner({path='login'}) {
  const [count,setCount]=useState(10)
  const navigate=useNavigate()

  useEffect(()=>{
    const interval =setInterval(()=>{
      setCount((prevValue)=>--prevValue)//prevValue is containing the prevalue
    },1000)
    if(count===0){
      navigate(`/${path}`)
    }
    return ()=>{
      clearInterval(interval)
    }
  },[count,navigate,path])
    return ( 
        <>
        '<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
          <h1 className="text-center"> Redirecting to you in {count} sec</h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
        </>
     );
}

export default Spiner;