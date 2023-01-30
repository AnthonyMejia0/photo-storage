import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useFirestore = (path) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, path), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [path]);

  return { docs };
};
