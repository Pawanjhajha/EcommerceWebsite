import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";
function Orders() {
    return ( 
        <Layout title={"your Order"}>
        <div className="container-fluid m-1 p-1">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h2>All Orders</h2>
                </div>
            </div>
        </div>
        </Layout>
     );
}

export default Orders;