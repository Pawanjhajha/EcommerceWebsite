import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import Layout from "../../componets/Layout/Layout";

function DeleteProduct() {
    const { auth } = useAuth()
    //console.log(auth.token)
    const token = auth.token
    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState()




    fetch(`/api/v1/product/deleteproduct/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token}`
        }
    }).then((result) => { return result.json() }).then((data) => {
        if (data?.success) {
            toast.success(data.message)
            navigate('/dashboard/admin/products')

        } else {
            toast.error(data?.error)
        }
    }).catch(e => {
        setError(e)
    })

    if (error) {
        toast.error("something went wrong")
    }
    return (
        <>
        </>
    );
}

export default DeleteProduct;