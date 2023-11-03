import Layout from "../Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

function CategoryForm() {
    //get the store value form localstorage
    const { auth, setAuth } = useAuth()
    const token=auth.token
    const [categoryName,setCategoryName]=useState('')
   const [error,setError]=useState('')
   const navigate=useNavigate()
    function handleform(e){
        e.preventDefault()
        const data={categoryName}
        
            fetch('/api/v1/category/create-category',{
                method:'POST',
                headers:{"Content-type":"application/json",
                Authorization:`${token}`
            },
                body:JSON.stringify(data)
            }).then((result)=>{return result.json()}).then((data)=>{
                if(data?.success){
                    toast.success(`${categoryName} is Created`)
                    setTimeout(()=>{
                        navigate('/dashboard/admin/create-category')
                    },2000)
                    
                }else{
                    toast.error(data.error)
                }
            }).catch(e=>{
                setError(e)
            })
    }
    if(error){
        toast.error("something went wrong")
    }
    return ( 
        <Layout>
        <div className="container-fluid">
            <div className="row justify-content-between">
            <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center m-3">Create New Category</h2>
                 <form onSubmit={(e)=>{handleform(e)}}>
                    <label className="mb-1">Enter New Category Name</label>
                    <input type="text" placeholder="Enter category name" className="form-control"
                    value={categoryName}
                    onChange={(e)=>{setCategoryName(e.target.value)}}/>
                    <button type="submit" className="form-control mt-2 btn btn-success">Create Category</button>
                </form>  
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        </Layout>
     );
}

export default CategoryForm;