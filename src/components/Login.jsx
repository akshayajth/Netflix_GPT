import React,{useState} from 'react'
import Header from './Header'

const Login = () => {

  const[isSignForm,setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {

    setIsSignInForm(!isSignForm);

  }
  return (
    <div>
      <Header />
      <div className="absolute">

        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6fd9d446-cd78-453a-8c9c-417ed3e00422/web/IN-en-20251117-TRIFECTA-perspective_2fe4e381-977f-49fd-a7f4-1da0bcf09429_large.jpg"
          alt="Netflix Login Banner"
        />
      </div>
<form className="w-3/12 absolute p-12  bg-black/60 my-36 mx-auto right-0 left-0 text-white rounded-lg">
        <h1 className="font-bold text-3xl py-4">{isSignForm ? "Sign In" : "Sign Up"}</h1>
        <input type="text"
          placeholder="Email Address"
          className="w-full p-3 mb-4  bg-gray-700  placeholder-gray-400  text-white rounded"
// w-full p-3 mb-4 bg-gray-700 placeholder-gray-400 text-white rounded
         
        />
{!isSignForm && (
        <input type="text"
          placeholder="Full Name"
          className={"w-full p-3 mb-4  bg-gray-700  placeholder-gray-400  text-white rounded "}
        />
)}
        <input type="password"
          placeholder="Password"
          className="w-full p-3 mb-4  bg-gray-700  placeholder-gray-400  text-white rounded"

          //w-full p-3 mb-4 bg-gray-700 placeholder-gray-400 text-white rounded
        />

        <button
          className="w-full bg-red-700 py-3 rounded font-semibold"
        >{isSignForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4" onClick={toggleSignInForm}>
          {isSignForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}</p>


      </form>


    </div>
  );
};

export default Login