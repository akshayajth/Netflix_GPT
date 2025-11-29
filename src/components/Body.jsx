import React from 'react'
import Login from './Login.jsx'
import Browse from './Browse.jsx'
import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { auth } from '../utils/firebase.jsx';
import { useDispatch } from 'react-redux'
import { addUser } from '@/utils/userSlice.jsx'

const Body = () => {
    const dispatch = useDispatch();


    const appRouter = createBrowserRouter([
        {

            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);
    //Control everything from single place

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const { uid, email, displayName,photoURL
                 } = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: user.photoURL,
                }));

                // ...
            } else {

                // User is signed out

                dispatch(removeUser());
            }
        });
    }, []);
    return (
        <div>

            <RouterProvider router={appRouter} />

        </div>
    )
}

export default Body