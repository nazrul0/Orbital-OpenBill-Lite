import { useState } from "react";
import { useEffect } from "react";
import { projAuth } from "../config/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setPending(true);

        // try signin
        try {
            const res= await projAuth.signInWithEmailAndPassword(email, password);

            // updating the state
            dispatch( {type: 'LOGIN', payload: res.user} );

            if (!isCancelled)
            {
                setPending(false);
                setError(null);
            }

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

    return { login, error, pending };
}