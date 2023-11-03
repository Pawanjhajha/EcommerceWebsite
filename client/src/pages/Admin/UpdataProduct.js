import { useEffect, useState } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout"
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
    const { id } = useParams()
    const { auth } = useAuth()
    const token = auth.token
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [Quantity, setQuantity] = useState()
    const [shipping, setshipping] = useState('')
    const [error, setError] = useState('')
    const [photo, setPhoto] = useState('')
    const [category, setCategory] = useState('')

    const navigate = useNavigate()
    //getsingle product
    function singleProduct() {
        fetch(`/api/v1/product/get-singleproduct/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data?.success) {
                //console.log(data.product)
                setName(data.product.name)
                setDescription(data.product.description)
                setPhoto(data.product.photo)
                setPrice(data.product.price)
                setQuantity(data.product.quantiy)
                setshipping(data.product.shipping)
            } else {
                toast.error(data.error)
            }
        }).catch(e => {
            console.log(e)
            setError(e)
        })
    }
    useEffect(() => { singleProduct() }, [])
    //get all category
    const getAllcategory = () => {
        fetch('/api/v1/category/getAllCategory').then((result) => { return result.json() }).then((data) => {
            // console.log(data)
            if (data?.success) {
                setCategories(data?.category)
            } else {
                toast(data.error)
            }
        }).catch(e => {
            console.log(error)
            setError(e)
        })

    }
    if (error) {
        toast.error("something went wrong")
    }
    useEffect(() => {
        getAllcategory()
        // eslint-disable-next-line
    }, [])

    function handlePhoto(e) {
        setPhoto(e.target.files[0])
    }
    function handleForm(e) {
        e.preventDefault()
        if (category) {
            console.log(name, price, description, Quantity, shipping, category)
            let data = new FormData()
            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('photo', photo)
            data.append('Quantity', Quantity)
            data.append('shipping', shipping)
            data.append('category', category)
            fetch(`/api/v1/product/updateproduct/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `${token}`
                },
                body: data
            }).then((result) => { return result.json() }).then((data) => {
                console.log(data)
                if (data?.success) {
                    toast.success(data?.message)
                    setTimeout(()=>{
                        navigate('/dashboard/admin/products')
                    },1500)
                    
                } else {
                    toast.error(data?.error)

                }
            }).catch(e => {
                setError(e)
            })
        }else{
            toast.error("Please Select category")
        }
    }
    if (error) {
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
                        <h2>Update Product</h2>
                        <form onSubmit={(e) => { handleForm(e) }}>
                            <label>Select Category</label>
                            <select className="form-select m-1" name={category} value={categories} onChange={(e) => { setCategory(e.target.value) }} required >
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id} >{c.name}</option>
                                ))}
                            </select>
                            <label>Product Image</label>
                            <div><img src={`/upload/${photo}`} alt="img" style={{ width: "100px", height: "100px" }} /></div>
                            <input type="file" className="form-control" onChange={(e) => { handlePhoto(e) }} accept="image/*" />
                            <label>Product Name</label>
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="Product Name" />
                            <label>Product description</label>
                            <textarea type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Enter description" />
                            <label>Product Price</label>
                            <input type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} className="form-control" placeholder="Enter price" />
                            <label>Product Quantity</label>
                            <input type="number" value={Quantity} onChange={(e) => { setQuantity(e.target.value) }} className="form-control" placeholder="Enter Quantity" />
                            <label>Select shipping</label>
                            <select className="form-select m-1" name={shipping} value={shipping} onChange={(e) => { setshipping(e.target.value) }}>
                                <option value='IN-Stock'>IN-Stock</option>
                                <option value='OUT-Stock'>OUT-Stock</option>
                            </select>
                            <button type="submit" className="btn btn-primary form-control  m-2">Update Product</button>
                        </form>
                        <Link to={`/dashboard/admin/deleteProduct/${id}`}><button className="btn btn-danger form-control m-2">Product delete</button></Link>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;