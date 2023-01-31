import { createUserWithEmailAndPassword } from "firebase/auth";
import { Image } from "phosphor-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [validInfo, setValidInfo] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

  const isEmail = (email) => emailRegex.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorEmail(null);
    setErrorPassword(null);
    setErrorConfirmPassword(null);
    setValidInfo(true);

    if (!isEmail(email)) {
      setErrorEmail("Please enter a valid email.");
      setValidInfo(false);
    }

    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters.");
      setValidInfo(false);
    }

    if (password !== confirmPassword) {
      setErrorConfirmPassword("Passwords do not match.");
      setValidInfo(false);
    }

    if (validInfo) {
      setDisableSubmit(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisableSubmit(false);
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
        Create Account
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
          {errorEmail && <div className="error">{errorEmail}</div>}
        </div>

        <div className="max-w-min">
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && <div className="error">{errorPassword}</div>}
        </div>

        <div>
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <div className="error">{errorConfirmPassword}</div>
          )}
        </div>

        <button
          className={` text-white px-2 py-1 rounded ${
            disableSubmit ? "bg-gray-500" : "bg-blue-400 hover:scale-95"
          }`}
          onClick={handleSubmit}
          type="submit"
          disabled={disableSubmit}
        >
          Submit
        </button>
      </form>
      <div className="text-center mt-10 text-gray-700 font-bold">
        Already have an account? <br />{" "}
        <Link to="/login">
          <span className="font-normal text-blue-400 underline underline-offset-2 hover:text-gray-500">
            Login here.
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
