import React, { useEffect } from "react";
import useStorage from "./useStorage";

const Progress = ({ panImage, setPanImage }) => {
  const { progress, url } = useStorage(panImage);

  useEffect(() => {
    if (url) {
      setPanImage(null);
    }
  }, [url, setPanImage]);

  return <div>succcess</div>;
};

export default Progress;
