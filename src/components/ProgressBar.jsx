import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";
import { motion } from "framer-motion";

function ProgressBar({ file, setFile }) {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
      className="mt-4 h-2 bg-gray-700 rounded-full"
    ></motion.div>
  );
}

export default ProgressBar;
