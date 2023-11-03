
import {createContext,useState,useContext, useEffect} from"react"

  const AuthContext=createContext()
//flow the data in context
const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })
    useEffect(()=>{
        const data1=localStorage.getItem('auth')
        
        if(data1){
            const parseData=JSON.parse(data1)
            setAuth({
                ...auth,//spared the auth data
                user:parseData.user,
                token:parseData.token
            })

        }
        //eslint-disable-next-line
    },[])
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
//create custom hook and use contextapi data
const useAuth=()=>useContext(AuthContext)
export {useAuth,AuthProvider}