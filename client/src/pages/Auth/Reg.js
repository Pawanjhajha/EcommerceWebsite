
import { useState } from "react";
import Layout from "../../componets/Layout/Layout";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

function Reg() {
    //password show functionality
    function showPasseord(e) {
        let eye = document.getElementById('eye')
        let a = document.getElementById("pass")
        if (a.type === "password") {
            a.type = "text";
            eye.classList.add("bi-eye")
            eye.classList.remove("bi-eye-slash")
            console.log("this is password")
        } else {
            a.type = "password"
            eye.classList.add("bi-eye-slash")
            eye.classList.remove("bi-eye")
            console.log("this is  not password")
        }
    }
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const [address,setAddress]=useState('')
const[number,setnumber]=useState()
const[answer,setAnswer]=useState('')
const navigate=useNavigate()
function formHandling(e){
    e.preventDefault()
    const data={name,number,password,address,email,answer}
    try{
         fetch('/api/v1/user/registration',{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
    }).then((result)=>{ return result.json()}).then((data)=>{
        
        if(data.success===true){
            toast.success(data.message)
            setTimeout(()=>{ navigate('/login')},3000)
           
        }else{
            toast.error(data.error)
        }
       
    })}catch(error){
        console.log(error.message)
        toast.error("Someting went wrong")
    }
   

}
 

    return (
        <Layout title={'Registeration -Ecommerce app'}>
            <section id="Register">
                <div className="container">
                    <div className="row" >
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            
                            <form onSubmit={(e)=>{formHandling(e)}}>
                            <h2>Registarion Here</h2>
                                <div className="form-floating">
                                    <input type="text" className="form-control " placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                                    <label className="form-label">Enter Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control " placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                                    <label className="form-label">  Enter Email</label>
                                </div>
                                <div id="pass-box" className="form-floating">
                                    <input type="password" name="pass" id="pass"  value={password}placeholder="Enter your Password" class="form-control" onChange={(e)=>{setPassword(e.target.value)}} required/>
                                    <label for=""> Enter Password</label>
                                    <i class="bi bi-eye-slash" id="eye" onClick={(e) => { showPasseord(e) }}></i>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control "  value={number}placeholder="Enter number" onChange={(e)=>{setnumber(e.target.value)}} required/>
                                    <label className="form-label"> Enter number No.</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control "  value={address} placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} required/>
                                    <label className="form-label"> Address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control "  value={answer} placeholder="What is your Favorite sports?" onChange={(e)=>{setAnswer(e.target.value)}} required/>
                                    <label className="form-label"> What is your Favorite sports? </label>
                                </div>
                                <button type="submit" className="btn btn-success form-control">Submit</button>
                            </form>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Reg;