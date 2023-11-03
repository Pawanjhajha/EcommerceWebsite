
import {createContext,useState,useContext,useEffect} from"react"

  const CartContext=createContext()
//flow the data in context
const CartProvider=({children})=>{
    const [cart,setCart]=useState([])
   useEffect(()=>{
    let existingCartItem=localStorage.getItem('cart')
    if(existingCartItem){
        setCart(JSON.parse(existingCartItem))
    }
   },[])
    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}
//create custom hook and use contextapi data
const useCart=()=>useContext(CartContext)
export {useCart,CartProvider}