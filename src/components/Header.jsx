import { signOut } from "@firebase/auth";
import { Image, List } from "phosphor-react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth } from "../firebase/config";

function Header() {
  const user = useRecoilValue(userState);

  const handleAuth = async () => {
    if (user) {
      await signOut(auth);
    }
  };

  const toggleMenu = (e) => {
    let menu = document.getElementById("menu");

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };

  return (
    <div className="w-screen">
      <div className="relative flex items-center justify-between w-[75vw] lg:w-[60vw] mx-auto py-5">
        <div className="flex space-x-2">
          <div className="font-bold text-2xl text-blue-400">Image Locker</div>
          <Image color="#60A5FA" size={32} />
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:scale-105"
        >
          <List size={32} />
        </button>

        <div className="hidden md:flex items-center justify-between space-x-4 h-full">
          <Link to="/signup">
            <button
              className={`${
                user ? "hidden" : ""
              } border-[1px] border-gray-500 text-white font-bold bg-gray-500 px-2 py-1 rounded hover:bg-white hover:text-gray-700`}
            >
              Sign-up
            </button>
          </Link>

          <Link onClick={handleAuth} to={!user && "/login"}>
            <button className="border-[1px] border-blue-400 text-blue-400 font-bold px-2 py-1 rounded hover:bg-blue-400 hover:text-white">
              {user ? "Logout" : "Login"}
            </button>
          </Link>
        </div>

        <div
          id="menu"
          className={`absolute hidden ${
            !user ? "space-x-5" : ""
          } text-white shadow-xl md:hidden right-0 top-[80%] bg-gray-500 p-3 rounded`}
        >
          <Link onClick={handleAuth} to={!user && "/login"}>
            <button className="hover:underline underline-offset-2">
              {user ? "Logout" : "Login"}
            </button>
          </Link>

          <Link to={!user && "/signup"}>
            <button
              className={`hover:underline underline-offset-2 ${
                user ? "hidden" : ""
              }`}
            >
              Sign-up
            </button>
          </Link>
        </div>
      </div>

      <h1 className="mx-auto max-w-fit text-[2.5rem] md:text-[2.75rem] mt-10 font-bold text-gray-700">
        Your Gallery
      </h1>
      <h4 className="font-light max-w-fit mx-auto mt-4 text-[0.8rem] md:text-sm text-gray-500">
        View, Upload, or Remove Your Photos.
      </h4>
    </div>
  );
}

export default Header;
