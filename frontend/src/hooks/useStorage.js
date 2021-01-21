import { useState, useEffect } from "react";
import { Storage, Firestore } from "../firebase";

const useStorage = (file) => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = Storage.ref(file.name);

    // const collectionRef = Firestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        // await collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { url, error };
};

export default useStorage;
