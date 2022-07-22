import { useState, useEffect } from "react";
import { projFirestore } from "../config/firebase";

export const usePaginateUpvotes = (
  collection,
  firstLatestDoc,
  initialNumber,
  fetchNumber,
  type,
) => {
  const [paginatedPropsUpvotes, setPaginatedPropsUpvotes] = useState([]);
  const [latestDoc, setLatestDoc] = useState(firstLatestDoc);

  useEffect(() => {
    const getNextPropsUpvotes = async () => {
      const ref = projFirestore
        .collection(collection)
        .orderBy("Upvotes", "desc")
        .limit(initialNumber);
      const data = await ref.get();
      let proposalsArray = [];
      data.docs.forEach((doc) => {
        proposalsArray.push({ ...doc.data(), id: doc.id });
      });
      setPaginatedPropsUpvotes((oldArray) => [...oldArray, ...proposalsArray]);
      setLatestDoc(data.docs[data.docs.length - 1]);

      // console.log("got", proposalsArray);
    };
    getNextPropsUpvotes();
  }, []);

  async function getNextPropsUpvotes() {
    try {
      const ref = projFirestore
        .collection(collection)
        .orderBy("Upvotes", "desc")
        .startAfter(latestDoc)
        .limit(fetchNumber);
      const data = await ref.get();
      let proposalsArray = [];
      data.docs.forEach((doc) => {
        proposalsArray.push({ ...doc.data(), id: doc.id });
      });
      setPaginatedPropsUpvotes((oldArray) => [...oldArray, ...proposalsArray]);
      setLatestDoc(data.docs[data.docs.length - 1]);

      // console.log("got", proposalsArray);
    } catch (err) {
      alert("There are no more " + type + " to display.");
    }
  }

  return { paginatedPropsUpvotes, getNextPropsUpvotes };
};
