import { useContext } from "react"
import { Navigate } from "react-router-dom"
import {Context} from './AppContext' 
export function ProtectedRoute({children}){
    const {currentUser}=useContext(Context)
    if(!currentUser){
        return <Navigate to='/'/>
    }
    
    return children
}