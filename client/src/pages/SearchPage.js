import { Link } from "react-router-dom";
import Layout from "../componets/Layout/Layout";
import { useSearch } from "../context/Search";

function SearchPage() {
    const { value, setValue } = useSearch([])
    console.log(value)

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">
                            Search Result
                        </h2>
                        <h4>{value?.results.length < 1
                            ? 'No Products Found'
                            : `Found ${value?.results.length}`}</h4>
                        <div className="d-flex flex-wrap mt-4">
                            {value.results?.map((v, key) => (
                                <div className="col-md-4 mb-2">
                                    <div class="card" style={{ width: "18rem" }}>
                                        <img src={`/upload/${v.photo}`} className="card-img-top " alt="..." style={{ width: "150px", height: "100px" }} />
                                        <div className="card-body">
                           <h5 className="card-title">{v.name}</h5>
                                            {/*substring() we can set limit in charater*/}
                                             <p className="card-text">{v.description.substring(0, 30)}</p>
                                            <h3 className="card-title">Price: ${v.price}</h3>
                                            <Link to="/" ><button className="btn btn-warning me-1">More Details</button></Link>
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

export default SearchPage;