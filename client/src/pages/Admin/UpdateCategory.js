import { useState } from "react";
import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

function UpdateCategory(props) {
    const {auth}=useAuth()
    const token=auth.token
    const [visible, setVisible] = useState(false)
    const [categoryName,setcategoryName]=useState(props.name)
    const [id,setId]=useState(props.id)
    const [error,setError]=useState()
    const navigate=useNavigate()
    const initModel = () => {//if model is open it will close the model .if model is close then it will open the model
        return setVisible(!visible)
    }
    function handleForm(e){
        e.preventDefault()
        const data={categoryName}
        //console.log(categoryName)
        fetch(`/api/v1/category/update-category/${id}`,{
            method:'PUT',
            headers:{"Content-type":"application/json",
            Authorization:`${token}`
        },
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.error)
            }
                initModel()
                navigate('/dashboard/admin/create-category')  
        }).catch(e=>{
            console.log(e)
            setError(e)
        })
    }
    if(error){
        toast.error("Somethig went wrong")
    }
    return (
        <>
            <Button className="btn-primary" onClick={initModel}>Edit</Button>
            <Modal show={visible}>
                <Modal.Header closeButton onClick={initModel}>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e)=>{handleForm(e)}}>
                <Modal.Body>
                    <label className="mb-2">Enter Category</label>
                    <input type="text" value={categoryName} className="form-control" onChange={(e)=>{setcategoryName(e.target.value)}} required></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={initModel}>Close</Button>
                    <Button type="submit" className="btn-dark" >Update</Button>
                </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UpdateCategory;