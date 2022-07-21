import { useState } from "react";
import { useEffect } from "react";
import { projAuth, projFirestore } from "../config/firebase";
import { useAuthContext } from "./useAuthContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCrud } from "./useCRUD";

export const useLogin = () => {
    const [isCancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const [user, setUser] = useState(null);
    const { dispatch } = useAuthContext();
    const { addDoc } = useCrud("UserData");

        const login = async (email, password) => {
        setError(null);
        setPending(true);

        
        
    }

    // cleanup function.
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { login, error, pending };
}