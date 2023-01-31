import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import ProgressBar from "./ProgressBar";

function UploadForm() {
  const user = useRecoilValue(userState);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile && types.includes(selectedFile.type) && user) {
      setFile(selectedFile);
      setError(null);
    } else if (!user) {
      setFile(null);
      setError("You must be logged in to upload an image.");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg).");
    }
  };

  return (
    <div className="relative w-[75vw] lg:w-[60vw] mx-auto">
      <form className="w-10 mx-auto">
        <label>
          <input type="file" onChange={handleChange} hidden />
          <PlusCircle className="mx-auto mt-5 cursor-pointer text-[40px] text-blue-400 hover:opacity-80 hover:scale-105" />
        </label>
        <div className="absolute left-[-12.5vw] lg:left-[-20vw] w-screen">
          {error && <div className="w-max mx-auto">{error}</div>}
        </div>
      </form>
      {file && <ProgressBar file={file} setFile={setFile} />}
    </div>
  );
}

export default UploadForm;
