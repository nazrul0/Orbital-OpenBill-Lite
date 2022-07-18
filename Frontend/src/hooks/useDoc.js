import { useEffect, useState } from "react";
import { projFirestore } from "../config/firebase";

export const useDoc = (collection, id) => {
  const [currDoc, setCurrDocs] = useState(null);
  
  // 1. NEED THE UNSUB!! doesn't matter that onSnapshot is being used on a particular doc.
  // 2. With the useEffect dependencies below, will only run when id or Collection change
  useEffect(() => {
    let docRef = projFirestore.collection(collection).doc(id);

    const unsub = docRef.onSnapshot( (doc) => {
      //console.log(doc.data());
      setCurrDocs(doc.data());
    });
  
    // unsubscribe continually executing the callback
    return () => unsub();
  }, [id, collection]);

  return { currDoc };
};
