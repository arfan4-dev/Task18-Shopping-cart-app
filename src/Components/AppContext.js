import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useState } from "react";
import { auth } from "../firebase";

export const Context=createContext(null);


export const ContextProvider=({children})=>{
const [currentUser,setCurrentUser]=useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })
    })

    return <Context.Provider value={{currentUser}}>
        {children}
    </Context.Provider>
}