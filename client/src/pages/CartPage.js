import { useNavigate } from "react-router-dom";
import Layout from "../componets/Layout/Layout"
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
function CartPage() {
    const { cart, setCart } = useCart()
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    //total price
    function totalPrice() {
        try {
            let total = 0//inital
            cart?.map((item) => (
                total = total + item.price

            ))
            return total.toLocaleString("en-US", {//in toLoacalString() we can tell the curency details
                style: "currency",
                currency: "USD"
            })

        } catch (error) {
            console.log(error)
        }
    }
    //delete Item
    function removeCartItem(pid) {
        try {
            let myCart = [...cart]//myCart store all item
            let index = myCart.findIndex(item => item._id === pid)//findIndex give the id of cart
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {/* show the user*/}
                            {`Hello ${auth?.token && auth?.user?.name}`}

                            <h2 className="text-center">
                                {/* show the product total nested if else*/}
                                {cart?.length > 0 ? `you have ${cart?.length} items in your cart ${auth?.token ? "" : "please login to cheak out"}`
                                    : "Your Cart Is Empty"}
                            </h2>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {
                            cart?.map((p) => (
                                <div className="row m-2 card flex-row">
                                    <div className="col-md-4">
                                        <img src={`/upload/${p.photo}`} alt="img" style={{ width: "150px", height: "100px" }} />
                                    </div>
                                    <div className="col-md-8">
                                        <h4>{p.name}</h4>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <h4>Price :${p.price}</h4>
                                        <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-6 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | payment</p>
                        <hr />
                        <h4>Total:{totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => { navigate('/dashboard/user/profile') }}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className="btn btn-outline-warning" onClick={() => { navigate('/dashboard/user/profile') }}>Update Address</button>
                                ) : (
                                    <button className="btn btn-outline-warning" onClick={() => { navigate('/login',{
                                        state:"/cartpage",
                                    }) }}>Please Login to Checkout</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;