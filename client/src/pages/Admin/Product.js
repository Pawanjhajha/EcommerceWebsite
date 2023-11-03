import { useEffect, useState } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Product() {
    const [error, setError] = useState('')
    const [products, setProducts] = useState([])
    function getAllProduct() {
        fetch('/api/v1/product/get-allproduct').then((result) => { return result.json() }).then((data) => {
            if (data?.success) {
                setProducts(data.products)
                //console.log(data.products)
            } else {
                toast.error(data?.error)
            }
        }).catch(e => {
            setError(e)
        })
    }
    useEffect(() => {
        getAllProduct()
    }, [])
    if (error) {
        toast.error("something went wrong")
    }
    return (
        <Layout>
            <section id="product">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2> All Product List</h2>
                        
                        {products.map((p, key) => (
                            <Link to={`/dashboard/admin/updateProduct/${p._id}`} className="product-link">
                            <div className="col-md-4" id="card">
                            <div className="card mb-4" style={{width: "18rem"}} key={p._id}>
                                <img src={`/upload/${p.photo}`} className="card-img-top" alt="..." style={{width:"200px",height:"100px"}}/>
                                    <div className="card-body">
                                       <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                            </div>
                            </div>
                            </Link>
                        ))}
                        
                    </div>
                    
                </div>
            </div>
            </section>
        </Layout>
    );
}

export default Product;