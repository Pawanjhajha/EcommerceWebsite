import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

function DeleteCategory(props) {
    const { auth } = useAuth()
    const [error, setError] = useState()
    const [id, setId] = useState(props.id)
    const navigate = useNavigate()
    const token = auth.token
    function handleDelete() {
        fetch(`/api/v1/category/deleteCategory/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "appliction/json",
                Authorization: `${token}`
            },
        }).then((result) => { return result.json() }).then((data) => {
            //console.log(data)
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.error)
            }
            navigate('/dashboard/admin/create-category')
        }).catch(e => {
            console.log(e.message)
            setError(e)
        })
    }
    if (error) {
        toast.error("something went wrong")
    }
    return (
        <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
    );
}

export default DeleteCategory;