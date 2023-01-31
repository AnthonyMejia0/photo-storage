import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getBlob, ref } from "firebase/storage";
import { motion } from "framer-motion";
import { DownloadSimple, Trash } from "phosphor-react";
import { Tooltip } from "react-tooltip";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { firestore, storage } from "../firebase/config";

function Modal({ selectedImage, setSelectedImage }) {
  const user = useRecoilValue(userState);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
    }
  };

  const handleDownload = async () => {
    const storageRef = user
      ? ref(storage, "users/" + user.uid + "/images/" + selectedImage.name)
      : ref(storage, "public/" + selectedImage.name);
    const blob = await getBlob(storageRef);

    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = selectedImage.name;
    a.click();
  };

  const handleDelete = async () => {
    await deleteDoc(
      doc(firestore, "users/", user.uid, "images", selectedImage.id)
    );
    await deleteObject(
      ref(storage, "users/" + user.uid + "/images/" + selectedImage.name)
    );

    setSelectedImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClick}
      className="backdrop flex flex-col -space-y-36 md:-space-y-48 xl:-space-y-10 items-center fixed top-0 left-0 w-full h-full bg-[#00000080] backdrop-blur-[1px]"
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.45 }}
        className="block max-w-[80%] max-h-[55%] xl:max-h-[70%] my-40 md:my-52 xl:my-[60px] mx-auto shadow-lg rounded-sm border-[3px] border-solid border-white"
        src={selectedImage.url}
        alt={selectedImage.name}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-x-10"
      >
        <button
          onClick={handleDownload}
          id="download-btn"
          data-tooltip-content="Download"
          className="bg-blue-400 p-1 rounded hover:scale-105"
        >
          <Tooltip anchorId="download-btn" />
          <DownloadSimple color="black" size={32} />
        </button>

        <button
          onClick={handleDelete}
          id="delete-btn"
          data-tooltip-content="Delete"
          className={`bg-red-500 p-1 rounded hover:scale-105 ${
            !user ? "hidden" : ""
          }`}
        >
          <Tooltip anchorId="delete-btn" />
          <Trash size={32} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
