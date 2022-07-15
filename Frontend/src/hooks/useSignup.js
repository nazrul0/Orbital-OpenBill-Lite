import { useState } from "react";
import { projAuth } from "../config/firebase";
import { useAuthContext } from "./useAuthContext";
import { useEffect } from "react";
import { useCrud } from "./useCRUD";

export const useSignup= () => {
    const [isCancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();
    const { addDoc } = useCrud("UserData");

    // the 3 properties are determined by firebase
    const signup = async (email, password, displayName) => {
        // set the appropriate statuses for when signup process is underway
        setError(null);
        setPending(true);

        // try signing up
        try{
            // async function hence await
            const res= await projAuth.createUserWithEmailAndPassword(email, password);
            //console.log(res.user.uid);

            if(!res){
                throw new Error("could not complete signup");
            }

            // firebase only allows to set displayname after user is created
            await res.user.updateProfile({ displayName });
            
            // attaching an array to every new created user (for upvotes tracking)
            addDoc({
                Uid: res.user.uid,
                UpvotedOn: [],
                Privileged: false
              });

            // dispatching the login action
            dispatch( {type: 'LOGIN', payload: res.user} );

            // only if component exists
            if (!isCancelled)
            {
                setPending(false);
                setError(null);
            }
        }
        catch(err){

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

    // have to return this since this is a hook- need to define what is returned
    return { signup, pending, error };
}