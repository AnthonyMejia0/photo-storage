import { useFirestore } from "../hooks/useFirestore";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

function Gallery({ setSelectedImage }) {
  const user = useRecoilValue(userState);
  const docPath = user ? "users/" + user.uid + "/images" : "public";
  const { docs } = useFirestore(docPath);

  return (
    <motion.div
      layout
      className="mt-14 lg:mt-16 mb-10 w-[75vw] lg:w-[60vw] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {docs.map((doc) => (
        <motion.div
          layout
          whileHover={{ opacity: 1 }}
          className="relative overflow-hidden h-0 py-[50%] px-0 opacity-[85%]"
          key={doc.id}
          onClick={() => setSelectedImage(doc)}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-0 left-0 cursor-pointer min-w-full min-h-full max-w-[150%]"
            src={doc.url}
            alt={doc.name}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Gallery;
