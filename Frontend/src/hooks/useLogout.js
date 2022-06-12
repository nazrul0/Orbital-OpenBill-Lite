import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projAuth } from "../config/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();
    const nav = useNavigate();

    const logout = async () => {
        setError(null);
        setPending(true);

        // try signout
        try {
            await projAuth.signOut();

            // above logs out from firebase
            // now dispatch logout- to change the state
            dispatch( {type: 'LOGOUT'} );

            if (!isCancelled)
            {
                setPending(false);
                setError(null);
            }

            nav("/Login");

        } catch(err) {
            if(!isCancelled)
            {
                console.log(err.message);
                setError(err.message);
                setPending(false);
            }
        }
    }

    // cleanup function.
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { logout, error, pending };
}