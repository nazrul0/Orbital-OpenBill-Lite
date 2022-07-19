import { useReducer } from "react";
import { projFirestore, timestamp } from "../config/firebase";

/*
    - A hook to take the collection as an argument and make crud actions reusable.
    - Different action options handled by a reducer
*/

const crudReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {...state, isPending: true, document: null, success: false};
        
        case 'ADDED_DOC':
            // make pending false, and save the document we got to the state
            return {isPending: false, document: action.payload, success: true};
        
        case 'DELETED_DOC':
            return {isPending: false, document: null, success: true, error: null};
            
        case 'UPDATED_DOC':
            return {isPending: false, document: action.payload, success: true, error: null};
            
        case 'READ_SINGLE':
            return {isPending: false, document: action.payload, success: true, error: null};
        
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

    // reference to the collection
    const ref= projFirestore.collection(collection);

    /* ----- CRUD ----- */
    const addDoc = async (doc) => {
        
        dispatch( {type: 'IS_PENDING'} ); // no payload, since simply changing a status
        
        // attaches firestore timestamp object to doc, tries to add to db
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc= await ref.add({...doc, CreatedAt: createdAt});
            dispatch({type: 'ADDED_DOC', payload: addedDoc});
        }
        catch (err) {
            dispatch({type: 'ERROR', payload: err.message});
        }
    }

    const deleteDoc = async (id) => {
        
        dispatch( {type: 'IS_PENDING'} ); // no payload, since simply changing a status

        try {
            await ref.doc(id).delete();
            
            dispatch({type: 'DELETED_DOC'});
        }
        catch (err) {
            dispatch({type: 'ERROR', payload: err.message});
        }

    }

    const updateDoc = async (id, updates) => {
        
        dispatch( {type: 'IS_PENDING'} ); // no payload, since simply changing a status

        try {
            const updatedDoc = await ref.doc(id).update(updates);
            dispatch({ type: 'UPDATED_DOC', payload: updatedDoc });
            
        }
        catch (err) {
            dispatch({type: 'ERROR', payload: err.message});
            
        }

    }

    /* 
        Note: ReadSingleDoc and reading collection can't be in this file as
        they involve useEffect and involve exporting a state that must change when the db values change
        see useDoc hook instead.
    */

    return {addDoc, deleteDoc, updateDoc, state}
}