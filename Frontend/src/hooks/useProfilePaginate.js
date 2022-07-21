import { useState, useEffect } from "react";
import { projFirestore } from "../config/firebase";
import { useAuthContext } from "../hooks/useAuthContext";

export const useProfilePaginate = (
  collection,
  firstLatestDoc,
  initialNumber,
  fetchNumber,
  type
) => {
  const { user } = useAuthContext(); // importing user
  const id = user.uid;

  const [paginatedProposals, setPaginatedProposals] = useState([]);
  const [latestDoc, setLatestDoc] = useState(firstLatestDoc);

  useEffect(() => {
    const getNextProposals = async () => {
      const ref = projFirestore
        .collection(collection)
        .where("OwnerID", "==", id)
        .orderBy("CreatedAt", "desc")
        .limit(initialNumber);
      const data = await ref.get();
      let proposalsArray = [];
      data.docs.forEach((doc) => {
        proposalsArray.push({ ...doc.data(), id: doc.id });
      });
      setPaginatedProposals((oldArray) => [...oldArray, ...proposalsArray]);
      setLatestDoc(data.docs[data.docs.length - 1]);

      // console.log("got", proposalsArray);
    };
    getNextProposals();
  }, []);

  async function getNextProposals() {
    try {
      const ref = projFirestore
        .collection(collection)
        .where("OwnerID", "==", id)
        .orderBy("CreatedAt", "desc")
        .startAfter(latestDoc)
        .limit(fetchNumber);
      const data = await ref.get();
      let proposalsArray = [];
      data.docs.forEach((doc) => {
        proposalsArray.push({ ...doc.data(), id: doc.id });
      });
      setPaginatedProposals((oldArray) => [...oldArray, ...proposalsArray]);
      setLatestDoc(data.docs[data.docs.length - 1]);

      // console.log("got", proposalsArray);
    } catch (err) {
      alert("There are no more " + type + " to display.");
    }
  }

  return { paginatedProposals, getNextProposals };
};
