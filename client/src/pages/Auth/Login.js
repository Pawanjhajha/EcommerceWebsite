import {  useState } from "react";
import Layout from "../../componets/Layout/Layout";
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/Auth";


function Login() {
        //password show functionality
        function showPassword(e) {
            let eye = document.getElementById('eye')
            let a = document.getElementById("pass")
            if (a.type === "password") {
                a.type = "text";
                eye.classList.add("bi-eye")
                eye.classList.remove("bi-eye-slash")
            } else {
                a.type = "password"
                eye.classList.add("bi-eye-slash")
                eye.classList.remove("bi-eye")
            }
        }
    
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
   //use the context api data
   const {auth,setAuth}=useAuth()
    const navigate=useNavigate()
    function formHandling(e){
        e.preventDefault()
        const data={password,email}
        try{
             fetch('/api/v1/user/login',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{ return result.json()}).then((data)=>{
           
            if(data.success===true){
                toast.success(data.message)
                setAuth({
                    ...auth,
                    user:data.user,
                    token:data.token
                })
                localStorage.setItem('auth',JSON.stringify(data))
                setTimeout(()=>{
                    navigate('/')
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
        <Layout title={'Login -Ecommerce app'}>
        <section id="login">
            <div className="container">
                <div className="row" >
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={(e)=>{formHandling(e)}}>
                        <h2>Login Here</h2>
                            
                            <div className="form-floating">
                                <input type="text" className="form-control " placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                                <label className="form-label">  Enter Email</label>
                            </div>
                            <div id="pass-box" className="form-floating">
                                <input type="password" name="pass" id="pass"  value={password}placeholder="Enter your Password" class="form-control" onChange={(e)=>{setPassword(e.target.value)}} required/>
                                <label for=""> Enter Password</label>
                                <i class="bi bi-eye-slash" id="eye" onClick={(e) => { showPassword(e) }}></i>
                            </div>
                           
                            <Link to='/forgotpassword'><button type="button" className="btn form-control mb-2">Forgot Password</button></Link>
                            <button type="submit" className="btn  form-control">Login</button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
    </Layout>
     );
}

export default Login;