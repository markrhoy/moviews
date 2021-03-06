import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()


export const useAuth = () => (
    useContext(AuthContext)
)

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    
    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    
    const value = {
        currentUser,
        logIn,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

