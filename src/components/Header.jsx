import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {

  const navigate = useNavigate();


  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img className="w-44"
        src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"
        alt="Netflix Logo"
      />


      {user && <div className='flex p-2'>
        <img
          className="w-12 h-12 "
          alt="usericon"
          src={user?.photoURL || "https://via.placeholder.com/150"}
        />
        <button
          onClick={handleSignOut}
          className="font-bold text-white">(Sign Out)</button>
      </div>

      }
    </div>
  );
};

export default Header