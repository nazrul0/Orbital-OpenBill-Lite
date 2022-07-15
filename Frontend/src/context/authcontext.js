import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { projAuth } from "../config/firebase";

export const authContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        // firebase returns a user object when login
        case 'LOGIN':
            //console.log(state)
            return { ...state, user: action.payload }
        
        case 'LOGOUT':
            return { ...state, user: null }
        
        // only make auth ready true after you get something from firebase
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true}
        
        case 'ADMIN_LOGIN':
            return { ...state, user: action.payload, privileged: true }

        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        privileged: false
    });

    // checks whether a user is logged in before rendering anything
    useEffect( ()=> {
        const unsub= projAuth.onAuthStateChanged( (user)=> {
            dispatch( {type:'AUTH_IS_READY', payload: user} );
            unsub();
        });
    }, [])

    //console.log('Authcontext state:', state);

    return (
        <authContext.Provider value={ {...state, dispatch}}>
            {children}
        </authContext.Provider>
    )
}