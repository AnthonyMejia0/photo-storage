import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { storage, firestore } from "../firebase/config";

export const useStorage = (file) => {
  const user = useRecoilValue(userState);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(
      storage,
      "users/" + user.uid + "/images/" + file.name
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(firestore, "users", user.uid, "images");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        let url = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();
        await addDoc(collectionRef, {
          url,
          createdAt,
          name: file.name,
        });
        setUrl(url);
      }
    );
  }, [file, user]);

  return { progress, error, url };
};
