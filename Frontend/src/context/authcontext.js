import { createContext, useReducer } from "react";


export const authContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        // firebase returns a user object when login
        case 'LOGIN':
            return { ...state, user: action.payload }
        
        case 'LOGOUT':
            return { ...state, user: null }

        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    console.log('Authcontext state:', state);

    return (
        <authContext.Provider value={ {...state, dispatch}}>
            {children}
        </authContext.Provider>
    )
}