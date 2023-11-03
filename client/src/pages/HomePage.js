import { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Prices } from "../componets/Prices";
import { useCart } from "../context/Cart";


function HomePage() {
    const [products, setProducts] = useState([])
    const [Categories, setCategories] = useState([])
    const [error, setError] = useState()
    const [checked, setchecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total,setTotal]=useState(0)
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState(false)
    const {cart,setCart}=useCart()

    //get total count 
    function getTotal(){
        fetch('/api/v1/product/productcount').then((result)=>{return result.json()}).then((data)=>{
            if(data?.success){
                setTotal(data?.total)
            }else{
                toast.error(data.error)
            }
        }).catch(e=>{
            setError(e)
        })
    }
    //load more 
    function loadMore(){
        setLoading(true)
        fetch(`/api/v1/product/productperpage/${page}`).then((result)=>{return result.json()}).then((data)=>{
            if(data?.success){
                setLoading(false)
                setProducts([...products,...data?.products])
                
            }else{
                toast.error(data.error)
            }
        }).catch(e=>{
            setLoading(false)
            setError(e)
        })
    }
    useEffect(()=>{
        if(page==1){
            return
        }
            loadMore()
    },[page])
   

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
    useEffect(() => {
        getAllcategory()
        getTotal()
        // eslint-disable-next-line
    }, [])

    //get all Products
    function getAllProducts() {
        setLoading(true)
        fetch(`/api/v1/product/productperpage/${page}`).then((result) => { return result.json() }).then((data) => {
            if (data?.success) {
                setLoading(false)
                setProducts(data?.products)
            } else {
                toast.error(data?.error)
            }
        }).catch(e => {
            setLoading(false)
            setError(e)
        })
    }
    //filter by Category
    function handleFilter(value, id) {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {

            all = all.filter((cat) =>
                cat !== id
            )
        }
        setchecked(all)
    }
     //filter by price
     function handlePrice(value, arr) {
        setRadio(arr) 
    }
    useEffect(() => {
       if(!checked.length || !radio.length) getAllProducts()
        // eslint-disable-next-line 
    }, [])
    //get filtred product
    function fileterProduct(){
        const data={checked,radio}
        //console.log(checked,radio)
        fetch('/api/v1/product/productfilters',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data?.success){
                setProducts(data.products)
            }else{
                toast.error(data.error)
            }
        }).catch(e=>{
            setError(e)
        })
    }
    useEffect(()=>{
         if(checked.length || radio.length) fileterProduct()
    },[checked,radio])
    if (error) {
        toast.error("Something went wrong")
    }

    return (
        <div>
            <Layout title={'All Products-Best Offers'}>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-3 ">
                            <h4 className="p-2">Filter By Category</h4>
                            {Categories?.map((c) => (
                                <div className="form-check ">
                                    <input type="checkbox" className="form-check-input ms-1" name="y" value={c.name} onChange={(e) => { handleFilter(e.target.checked, c._id) }} />
                                    <label className="ms-2 form-check-label">{c.name}</label>
                                </div>
                            ))}
                            {/*Price filter*/}
                            <h4 className="p-2">Filter By Price</h4>
                            {Prices?.map(p => (
                                <div className="form-check ">
                                    <input type="radio" className="form-check-input ms-1"
                                        name="y"
                                        value={p.arr}
                                        onChange={(e) => { handlePrice(e.target.radio,p.arr) }} />
                                    <label className="ms-2 form-check-label">{p.name}</label>
                                </div>
                            ))}
                            <button className="btn btn-danger mt-2 form-control" onClick={()=>{window.location.reload()}}>Rest Filters</button>
                        </div>
                        <div className="col-md-9">

                            {/*{JSON.stringify(radio, null, 4)}*/}
                            <h2 className="text-center">All Products</h2>
                            <div className="d-flex flex-wrap">
                                {products.map((p, key) => (
                                    <div className="col-md-4 mb-2">
                                        <div class="card" style={{ width: "18rem" }}>
                                            <img src={`/upload/${p.photo}`} className="card-img-top " alt="..." style={{ width: "150px", height: "100px" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                {/*substring() we can set limit in charater*/}
                                                <p className="card-text">{p.description.substring(0,30)}</p>
                                                <h3 className="card-title">Price: ${p.price}</h3>
                                                <Link to={`/proudctdetails/${p._id}`} ><button className="btn btn-warning me-1">More Details</button></Link>
                                                <button className="btn btn-success ms-1" 
                                                onClick={()=>{setCart([...cart,p]);
                                                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                                toast.success("Item Added to cart")
                                                }}>
                                                    ADD TO CART
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="m-2 p-3">
                                {products && products.length < total && (
                                    <button className="btn btn-warning" 
                                    onClick={(e)=>{e.preventDefault()
                                    setPage(page +1)}}>
                                        {loading ?"Lodaing...":"Load More"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </div>
    );
}

export default HomePage;