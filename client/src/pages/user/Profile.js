import { useEffect, useState } from "react";
import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
function Profile() {
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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [number, setnumber] = useState()
    const { auth, setAuth } = useAuth()
    const token = auth.token
    const id=auth?.user?._id
    

    //get userData
    useEffect(()=>{
        const {email,name,number,address,}=auth?.user
        setName(name)
        setEmail(email)
        setnumber(number)
        setAddress(address)
    },[])

    function formHandling(e) {
        e.preventDefault()
        
        const data = { name, number, password, address, email }
       
        try {
            fetch(`/api/v1/user/userupdate/${id}`, {
                method: 'PUT',
                headers: { "Content-type": "application/json",
                 Authorization: `${token}`
             },
                body: JSON.stringify(data)
            }).then((result) => { return result.json() }).then((data) => {
                if(data?.success){
                    //console.log(data)
                    setAuth({...auth,user:data?.user})
                    //set user update in localStorage
                    let ls=localStorage.getItem('auth')
                    ls=JSON.parse(ls)
                    ls.user=data?.user
                    
                    localStorage.setItem('auth',JSON.stringify(ls))
                    toast.success(data.message)
                }else{
                    toast.error(data.error)
                }

            })
        } catch (error) {
            console.log(error.message)
            toast.error("Someting went wrong")
        }


    }
    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-1 p-1 " id="profile">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={(e) => { formHandling(e) }}>
                            <h2>User Profile</h2>
                            <div className="form-floating">
                                <input type="text" className="form-control " placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                                <label className="form-label">Enter Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control " placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required  disabled/>
                                <label className="form-label">  Enter Email</label>
                            </div>
                            <div id="pass-box" className="form-floating">
                                <input type="password" name="pass" id="pass" value={password} placeholder="Enter your Password" class="form-control" onChange={(e) => { setPassword(e.target.value) }}  />
                                <label for=""> Enter Password</label>
                                <i class="bi bi-eye-slash" id="eye" onClick={(e) => { showPasseord(e) }}></i>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control " value={number} placeholder="Enter number" onChange={(e) => { setnumber(e.target.value) }} required />
                                <label className="form-label"> Enter number No.</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control " value={address} placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} required />
                                <label className="form-label"> Address</label>
                            </div>

                            <button type="submit" className="btn btn-success form-control">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;