import { useEffect, useState } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout"
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
function CreateProduct() {
   const {auth}= useAuth()
   const token=auth.token
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [shipping, setshipping] = useState('')
    const [error,setError]=useState('')
    const [photo,setPhoto]=useState('')
    const [category,setCategory]=useState('')
    const navigate=useNavigate()
    //get all category
    const getAllcategory = () => {
          fetch('/api/v1/category/getAllCategory').then((result) => { return result.json() }).then((data) => {
           // console.log(data)
            if (data?.success) {
                setCategories(data?.category)
            } else {
                toast(data.error)
            }
        }).catch(e=>{
            console.log(error)
            setError(e)
        })

    }
    if(error){
        toast.error("something went wrong")
    }
    useEffect(() => {
        getAllcategory()
        // eslint-disable-next-line
    }, [])

    function handlePhoto(e){
        setPhoto(e.target.files[0])
    }
    function handleForm(e){
        e.preventDefault()
        //console.log(name,price,description,Quantity,shipping,category)
        let data=new FormData()
        data.append('name',name)
        data.append('price',price)
        data.append('description',description)
        data.append('photo',photo)
        data.append('Quantity',Quantity)
        data.append('shipping',shipping)
        data.append('category',category)
        fetch('/api/v1/product/createproduct',{
            method:'POST',
            headers:{
                Authorization:`${token}`},
            body:data
        }).then((result)=>{return result.json()}).then((data)=>{
            console.log(data)
            if(data?.success){
                navigate('/dashboard/admin/products')
            }else{
                toast.error(data?.error)
                
            }
        }).catch(e=>{
            setError(e)
        })
    }
   if(error){
    toast.error("something went wrong")
   }
    return (
        <Layout title={"Dashboard-Create Product"}>
            <div className="container-fluid m-1 p-1" id="createProduct">
                <div className="row justify-content-between">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-6">
                        <h2>Create Product</h2>
                       <form onSubmit={(e)=>{handleForm(e)}}>
                        <label>Select Category</label>
                        <select className="form-select m-1" name={category} onChange={(e)=>{setCategory(e.target.value)}} >
                            <option >--Select Category--</option>
                            {categories?.map((c)=>(
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}  
                        </select>
                        <label>Product Image</label>
                        <input type="file" className="form-control" onChange={(e)=>{handlePhoto(e)}} accept="image/*"/>
                        <label>Product Name</label>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Product Name"/>
                        <label>Product description</label>
                        <textarea type="text" className="form-control"value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter description"/>
                        <label>Product Price</label>
                        <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="form-control" placeholder="Enter price"/>
                        <label>Product Quantity</label>
                        <input type="number" value={Quantity} onChange={(e)=>{setQuantity(e.target.value)}} className="form-control" placeholder="Enter Quantity"/>
                        <label>Select shipping</label>
                        <select className="form-select m-1" name={shipping} onChange={(e)=>{setshipping(e.target.value)}}>
                           <option value='IN-Stock'>IN-Stock</option>
                           <option value='OUT-Stock'>OUT-Stock</option>
                        </select>
                        <button type="submit" className="btn btn-primary form-control m-2">Create Product</button>
                        </form>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProduct;