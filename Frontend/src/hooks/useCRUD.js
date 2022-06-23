import { useEffect, useReducer, useState } from "react";
import { projFirestore, timestamp } from "../config/firebase";

/*
    - A hook to take the collection as an argument and make crud actions reusable.
    - Different action options handled by a reducer
*/

const crudReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {...state, isPending: true, document: null};
        
        case 'ADDED_DOC':
            // make pending false, and save the document we got to the state
            return {...state, isPending: false, document: action.payload};
        case 'ERROR':
            return {...state, isPending: false, document: null, success: false, error: action.payload};

        default:
            return state;
    }
}

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

export const useCrud = (collection) => {
    const [state, dispatch] = useReducer(crudReducer, initialState);
    const [isCancelled, setCancelled] = useState(false);

    // reference to the collection
    const ref= projFirestore.collection(collection);

    /* ----- CRUD ----- */
    const addDoc = async (doc) => {
        dispatch( {type: 'IS_PENDING'} ); // no payload, since simply changing a status

        // attaches firestore timestamp object to doc, tries to add to db
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc= await ref.add({...doc, createdAt: createdAt});

            // only update the state via the dispatch if user has not clicked away
            if (!isCancelled){
                dispatch({type: 'ADDED_DOC', payload: addedDoc, success: true, error: null});
            }
        }
        catch (err) {
            if (!isCancelled){
                dispatch({type: 'ERROR', payload: err.message});
            }
        }

    }

    const deleteDoc = async (doc) => {

    }

    // cleanup function (if user clicks away)
    useEffect(() => {
        return () => setCancelled(true);
    },[])

    return {addDoc, deleteDoc, state}
}