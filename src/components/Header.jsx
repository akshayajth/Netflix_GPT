import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '@/utils/userSlice.jsx'
import { LOGO } from '../utils/constants.jsx';
import { toggleGptSearchView } from '@/utils/gptSlice.jsx';
import { lang } from '@/utils/languageConstants.jsx';
//import { toggleGptSearchView } from '@/utils/gptSlice.jsx';

import { SUPPORTED_LANGUAGES } from "@/utils/constants.jsx";
import { changeLanguage } from '@/utils/configSlice.jsx';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

      }).catch((error) => {

      });
  };

  const handleLanguageChange = (e) => {
   dispatch(  changeLanguage(e.target.value));
  }

  const showGptSearch = useSelector ((store) => store.gpt.showGptSearch)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL
        } = user;
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: user.photoURL,
        })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component un mounts
    return () => {
      unsubscribe();
    }
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    //Toggle GPT SEARCH MODAL

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img className="w-44"
        src={LOGO}
        alt="Netflix Logo"
      />
      {user &&
        <div className='flex p-2'>
          {showGptSearch && (
            <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key =
              {lang.identifier} 
              value={lang.identifier}>
              {lang.name}
              </option>
            ))}
            
          </select>
          )}
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}
          >

            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
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