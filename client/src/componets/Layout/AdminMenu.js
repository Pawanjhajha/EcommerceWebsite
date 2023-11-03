import { Link } from "react-router-dom"
function AdminMenu() {
    return (

        <section id="adminMenu">
            <div className="list-group">
                <h4>Dashboard</h4>
                <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</Link>
                <Link to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</Link>
                <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</Link>
                <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</Link>
            </div>
        </section>
    );
}

export default AdminMenu;