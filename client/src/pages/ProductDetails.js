import { Link, useParams } from "react-router-dom";
import Layout from "../componets/Layout/Layout";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";


function ProductDetails() {
    const [error,setError]=useState()
    const [product,setProduct]=useState([])
    const [similar,setSimilar]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        fetch(`/api/v1/product/get-singleproduct/${id}`).then((result)=>{return result.json()}).then((data)=>{
            console.log(data.product)
            if(data?.success){
                setProduct(data.product)
                getSimilarProduct(data?.product?.category?._id,data?.product?._id)
            }else{
                toast.error(data.error)
            }
        }).catch(e=>{
            setError(e)
        })
    },[])
   //get similar product
   //const categoryid=product?.category?._id
   //console.log(categoryid)
   //console.log(id)
   function getSimilarProduct(categoryid,id){
    
    fetch(`/api/v1/product/similarproduct/${categoryid}/${id}`).then((result)=>{return result.json()}).then((data)=>{
        console.log(data)
        if(data?.success){
            setSimilar(data?.products)
        }else{
            toast.error(data.error)
        }
    }).catch(e=>{
        setError("something went wrong in getSimilar product")
    })
   }
    if(error){
        toast.error("Something went wrong in more details")
    }
    return ( 
        <Layout>
           <div className="container">
            <div className="row justify-content-between">
                <div className="col-md-6 ">
                    <img className="m-2" src={`/upload/${product.photo}`} alt="img" style={{width:"300px",height:"300px;"}}/>
                </div>
                <div className="col-md-6 ">
                    <h2 className="text-center">Product details</h2>
                    <h6 className="text-center">Name:{product.name}</h6>
                    <p>{product.description}</p>
                    <h2>Price: ${product.price}</h2>
                    <h6>Category :{product?.category?.name}</h6>
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                    </div>
            </div>
            
           </div>
           <hr/>
           <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>similar Product</h2>
                    {/* ye if h () me return statemnent h */ }
                    {similar.length < 1 && (<p className="text-center">no similar Product found</p>)}
                    <div className="d-flex flex-wrap">
                                {similar.map((p, key) => (
                                    <div className="col-md-4 mb-2">
                                        <div class="card" style={{ width: "18rem" }}>
                                            <img src={`/upload/${p.photo}`} className="card-img-top " alt="..." style={{ width: "150px", height: "100px" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                {/*substring() we can set limit in charater*/}
                                                <p className="card-text">{p.description.substring(0,30)}</p>
                                                <h3 className="card-title">Price: ${p.price}</h3>
                                                <Link to="/" ><button className="btn btn-success ms-1">ADD TO CART</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                </div>
            </div>
           </div>
        </Layout>
     );
}

export default ProductDetails;