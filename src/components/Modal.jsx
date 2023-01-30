import { motion } from "framer-motion";

function Modal({ selectedImage, setSelectedImage }) {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClick}
      className="backdrop fixed top-0 left-0 w-full h-full bg-[#00000080] backdrop-blur-[1px]"
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.45 }}
        className="block max-w-[80%] lg:min-w-[60%] max-h-[80%] my-60 lg:my-[60px] mx-auto shadow-lg rounded-sm border-[3px] border-solid border-white"
        src={selectedImage.url}
        alt={selectedImage.name}
      />
    </motion.div>
  );
}

export default Modal;
