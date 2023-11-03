import {Route,Routes} from"react-router-dom"
import  HomePage from"./pages/HomePage.js"
import About from "./pages/About.js"
import Contect from "./pages/Contect";
import Pagenotfound from "./pages/Pagenotfound.js";
import Reg from "./pages/Auth/Reg.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./componets/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./componets/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js"
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import CategoryForm from "./componets/form/CategoryFrom.js";
import DeleteCategory from "./pages/Admin/DeleteCategory.js";
import Product from "./pages/Admin/Product.js";
import UpdateProduct from "./pages/Admin/UpdataProduct.js";
import DeleteProduct from "./pages/Admin/DeleteProduct.js";
import SearchPage from "./pages/SearchPage.js";
import ProductDetails from "./pages/ProductDetails.js";
import CartPage from "./pages/CartPage.js";

function App() {
  return (
    
    <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contect/>}/>
    <Route path='/singup' element={<Reg/>}/>
    <Route path='/login' element={<Login/>}/>
   
    <Route path='/forgotpassword'element={<ForgotPassword/>}/>
    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<Dashboard/>}/>
    <Route path='user/orders' element={<Orders/>}/>
    <Route path='user/profile' element={<Profile/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/users' element={<Users/>}/>
      <Route path="admin/delete/:id" element={<DeleteCategory/>}/>
      <Route path="admin/products" element={<Product/>}/>
      <Route path="admin/updateProduct/:id" element={<UpdateProduct/>}/>
      <Route path="admin/deleteProduct/:id" element={<DeleteProduct/>}/>
    </Route>
    <Route path='/categoryform'element={<CategoryForm/>}/>
    <Route path="/cartpage" element={<CartPage/>}/>
    <Route path='/searchpage' element={<SearchPage/>}/>
    <Route path='/proudctdetails/:id'element={<ProductDetails/>}/>
     <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
   
  );
}

export default App;
