import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice.jsx";
import { USER_AVATAR } from "../utils/constants.jsx";


const Login = () => {
  const [isSignForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
 
  const dispatch = useDispatch();

  const handleButtonClick = () => {

    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

    console.log(emailValue);
    console.log(passwordValue);

    // if your checkValidData supports name, this is fine.
    // In Sign In mode, nameValue will just be "".
    const message = checkValidData(emailValue, passwordValue, nameValue);
    setErrorMessage(message);

    if (message) return;

    // Sign In / Sign Up logic
    if (!isSignForm) {
      // SIGN UP
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current?.value || "",
            photoURL: USER_AVATAR
          })
          
          .then(() => {

            const { uid, email, displayName,photoURL
                             } = auth.currentUser;
                            dispatch(addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: user.photoURL,
                            }));
           
          })
          
          .catch((error) => {
            // An error occurred
            // ...
          });
          console.log("Signed up:", user);
          
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // SIGN IN
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignForm);
    setErrorMessage(null);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6fd9d446-cd78-453a-8c9c-417ed3e00422/web/IN-en-20251117-TRIFECTA-perspective_2fe4e381-977f-49fd-a7f4-1da0bcf09429_large.jpg"
          alt="Netflix Login Banner"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black/60 my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignForm ? "Sign In" : "Sign Up"}
        </h1>

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full p-3 mb-4 bg-gray-700 placeholder-gray-400 text-white rounded"
        />


        {!isSignForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-gray-700 placeholder-gray-400 text-white rounded"
          />
        )}

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 placeholder-gray-400 text-white rounded"
        />

        <p className="text-red-500 font-bold text-lg py-3">{errorMessage}</p>

        <button
          type="button"
          className="w-full bg-red-700 py-3 rounded font-semibold"
          onClick={handleButtonClick}
        >
          {isSignForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
