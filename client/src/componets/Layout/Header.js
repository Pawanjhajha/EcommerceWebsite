import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify"
import Searchinput from "../form/Searchinput";
import { useCart } from "../../context/Cart";

function Header() {
    const { auth, setAuth } = useAuth()
    const {cart}=useCart()
    
    const navigate = useNavigate()
    function handleLogout(e) {
        setAuth({
            ...auth,//spared isliye kare rahe kayoki auth me user,token ke alwava bi bhut chize ho sakti h or use me se jo chahiye use nikal lege
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Logout successfully')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    return (
        <section id="header">
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg ">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/">
                                    <img src="https://5.imimg.com/data5/SELLER/Logo/2023/5/307678238/TW/TZ/TB/39112667/kshdhsdc-120x120.jpeg" data-dataimg="https://5.imimg.com/data5/SELLER/Logo/2023/5/307678238/TW/TZ/TB/39112667/kshdhsdc-120x120.jpeg" alt="Sinetech Power Solutions" /></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav  mb-2 mb-lg-0">
                                        <Searchinput />
                                        <li className="nav-item">
                                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                                        </li>
                                       
                                        {
                                            !auth.user ? (<>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/singup">Singup</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/login">Login</Link>
                                                </li>
                                            </>) : (<>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {auth?.user?.name}
                                                    </Link>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <li><Link className="dropdown-item bg-primary mb-2" to={`/dashboard/${auth?.user?.role === 'ADMIN' ? 'admin' : 'user'}`}>Dashboard</Link></li>
                                                        <li>
                                                            <Link className="dropdown-item bg-primary" onClick={(e) => { handleLogout(e) }}  >Logout</Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                            </>)
                                        }
                                        <li className="nav-item">
                                            <Link className="nav-link bg-success" to="/cartpage" id="cart">
                                                Cart ({cart?.length})
                                                </Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;