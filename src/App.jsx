import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./atoms/userAtom";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Modal from "./components/Modal";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { auth } from "./firebase/config";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const setCurrentUser = useSetRecoilState(userState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setCurrentUser(userCopy);
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
            <div>
              <SignUp />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />

        <Route
          path="/"
          element={
            <div>
              <Header />
              <UploadForm />
              <Gallery setSelectedImage={setSelectedImage} />
              {selectedImage && (
                <Modal
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
