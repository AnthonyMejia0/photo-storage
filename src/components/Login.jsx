import { signInWithEmailAndPassword } from "firebase/auth";
import { Image } from "phosphor-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Invalid Email Address.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect Password.");
        } else {
          setError("Error. Please try again.");
        }
        console.log(error.code);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen flex flex-col items-center">
      <Link to="/">
        <button className="flex space-x-2 mx-auto mt-16">
          <div className="font-bold text-2xl lg:text-3xl text-blue-400">
            Image Locker
          </div>
          <Image color="#60A5FA" size={32} />
        </button>
      </Link>
      <h1 className="mx-auto text-[2rem] md:text-[2.5rem] my-8 font-bold text-gray-700">
        Welcome Back
      </h1>
      <form className="mx-auto flex flex-col space-y-5 lg:space-y-8">
        <div className="">
          <input
            className="input-field"
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="max-w-min">
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="text-white px-2 py-1 rounded bg-blue-400 hover:scale-95"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="text-center mt-10 text-gray-700 font-bold">
        Need an account? <br />{" "}
        <Link to="/signup">
          <span className="font-normal text-blue-400 underline underline-offset-2 hover:text-gray-500">
            Sign up here.
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
