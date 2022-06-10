import { authContext } from "../context/authcontext";
import { useContext } from "react";

export const useAuthContext= () => {
    const context = useContext(authContext);

    if(!context){
        throw Error('use authContext must be inside a provider')
    }

    return context;
}