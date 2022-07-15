import { useState } from "react";
import { useEffect } from "react";
import { projAuth, projFirestore } from "../config/firebase";
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
            let ref = projFirestore.collection("UserData");
            const snapshot = await ref.where('Uid', '==', res.user.uid).get();
            if(!snapshot.empty){
                snapshot.forEach( doc => {
                    if(doc.get("Privileged"))
                    {
                        // casting off a login for privileged user
                        dispatch( {type: 'ADMIN_LOGIN', payload: res.user})
                        return;
                    }
                })
            }
            
            // if snapshot is empty, or if doc.Privileged is false, means normal user.
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