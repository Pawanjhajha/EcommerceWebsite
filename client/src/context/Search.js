
import {createContext,useState,useContext} from"react"

  const SearchContext=createContext()
//flow the data in context
const SearchProvider=({children})=>{
    const [value,setValue]=useState({
        keyword:"",
        results:[],
    })
   
    return(
        <SearchContext.Provider value={{value,setValue}}>
            {children}
        </SearchContext.Provider>
    )
}
//create custom hook and use contextapi data
const useSearch=()=>useContext(SearchContext)
export {useSearch,SearchProvider}