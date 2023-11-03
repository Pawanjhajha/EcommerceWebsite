
import { useState, useEffect } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout"
import { toast } from "react-toastify";


import { Link } from "react-router-dom";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";
function Update() {
    const [categories, setCategories] = useState([])

    //get all category
    useEffect(() => {
        fetch('/api/v1/category/getAllCategory').then((result) => { return result.json() }).then((data) => {
            if (data?.success) {
                setCategories(data?.category)
            } else {
                toast(data.error)
            }
        })
    }, [])



    return (
        <Layout title={'Dashboard-Create Category'}>
            <div className="container-fluid m-1 p-1">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 ">
                        <h2 className="text-center mb-3">Mange Category</h2>
                        <Link to='/categoryform'><button className="btn btn-success form-control">Create new Category</button></Link>
                        <div className="table-responsive">
                            <table className="table  table-hover ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action-1</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {categories?.map((c) => (
                                        <tr>
                                            <td key={c._id}>{c.name}</td>
                                            <td>
                                                <UpdateCategory id={c._id} name={c.name} />
                                                <DeleteCategory id={c._id} />
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div>
        </Layout>
    );
}

export default Update;