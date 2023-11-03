import Layout from "../../componets/Layout/Layout";
import {  useState } from "react";
import {toast} from "react-toastify"
import { useNavigate} from "react-router-dom"


function ForgotPassword() {
         //password show functionality
        
    
    const[email,setEmail]=useState('')
    const[newPassword,setnewPassword]=useState('')
    const[answer,setAnswer]=useState('')
   
  
    const navigate=useNavigate()
    function formHandling(e){
        e.preventDefault()
        console.log(newPassword,email,answer)
       const data={newPassword,email,answer}
        try{
             fetch('/api/v1/user/forgotpassword',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{ return result.json()}).then((data)=>{
           console.log(data)
            if(data.success===true){
                toast.success(data.message)
                setTimeout(()=>{
                    navigate('/login')
                },3000)
               
            }else{
                toast.error(data.error)
            }
       
           
        })}catch(error){
            console.log(error.message)
            toast.error("Someting went wrong")
        }
       
    
    }
    return ( 
        <Layout title={'Forgot-password-Ecommerce app'}>
            <section id="login">
            <div className="container">
                <div className="row" >
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={(e)=>{formHandling(e)}}>
                        <h2>Forgot Password </h2>
                            
                            <div className="form-floating">
                                <input type="text" className="form-control " placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                                <label className="form-label">  Enter Email</label>
                            </div>
                            <div id="pass-box" className="form-floating">
                                <input type="password" name="pass" id="pass"  value={newPassword} placeholder="Enter your Password" class="form-control" onChange={(e)=>{setnewPassword(e.target.value)}} required/>
                                <label for=""> Enter NewPassword</label>
                            </div>
                            <div id="pass-box" className="form-floating">
                                <input type="text" name="pass" id="pass"  value={answer} placeholder="Enter your answare" class="form-control" onChange={(e)=>{setAnswer(e.target.value)}} required/>
                                <label for="">  What is your Favorite sports?</label>
                            </div>
                           
                           
                            <button type="submit" className="btn  form-control">Reset</button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
        </Layout>
     );
}

export default ForgotPassword;