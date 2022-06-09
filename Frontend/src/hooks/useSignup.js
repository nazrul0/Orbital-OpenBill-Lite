import { useState } from "react";
import { projAuth } from "../config/firebase";

export const useSignup= () => {
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    // the 3 properties are determined by firebase
    const signup = async (email, password, displayName) => {
        // set the appropriate statuses for when signup process is underway
        setError(null);
        setPending(true);

        // try signing up
        try{
            // async function hence await
            const res= await projAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);

            if(!res){
                throw new Error("could not complete signup");
            }

            // firebase only allows to set displayname after user is created
            await res.user.updateProfile({ displayName });

            setPending(false);
            setError(null);
        }
        catch(err){
            console.log(err.message);
            setError(err.message);
            setPending(false);
        }

    }

    // have to return this since this is a hook- need to define what is returned
    // can view this as yet another way to return/ export functions written in another file but called elsewhere
    return { signup, pending, error };
}