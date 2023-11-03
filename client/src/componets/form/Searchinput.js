import { useEffect, useState } from "react";
import { useSearch } from "../../context/Search";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Searchinput() {
    const [error,setError]=useState()
    const {value,setValue}=useSearch()
    const navigate=useNavigate()
    function handleForm(e){
        e.preventDefault()
        console.log(value.keyword)
       fetch(`/api/v1/product/searchproduct/${value.keyword}`).then((result)=>{return result.json()}).then((data)=>{
        //console.log(data.result)
        setValue({...value,results:data.result})
        //console.log(value)
        navigate('/searchpage')
       }).catch(e=>{
        setError(e)
       })
    }
    if(error){
        toast.error("Something went wrong in searching")
    }
    return ( 
        <section id="searchinput">
            <form className="d-flex" role="search" onSubmit={(e)=>{handleForm(e)}}>
                <input className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value.keyword}
                onChange={(e)=>{setValue({...value,keyword:e.target.value})}}
                />
                
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </section>
     );
}

export default Searchinput;