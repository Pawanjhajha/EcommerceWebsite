import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout"
function Users() {
    return ( 
        <Layout title={"Dashboard -All Users"}>
           <div className="container-fluid m-1 p-1">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                   <h2>All Users</h2>
                </div>
            </div>
           </div>
        </Layout>
     );
}

export default Users;