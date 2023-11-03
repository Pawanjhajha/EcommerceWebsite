import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout"
import { useAuth } from "../../context/Auth";
function AdminDashboard() {
    const {auth}=useAuth()
    return ( 
    
        <Layout>
           <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 mt-5">
                        <h3 className="text-center">Admin Name:{auth?.user?.name}</h3>
                        <h3 className="text-center">Admin E-Mail:{auth?.user?.email}</h3>
                        <h3 className="text-center">Admin Contact:{auth?.user?.number}</h3>
                    </div>
                </div>
            </div>
           </div>
        </Layout>
     );
}

export default AdminDashboard;