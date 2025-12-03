import React from 'react'
import Login from './Login.jsx'
import Browse from './Browse.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { auth } from '../utils/firebase.jsx';
import { useDispatch } from 'react-redux'
import { addUser,removeUser  } from '@/utils/userSlice.jsx'

const Body = () => {
    
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

   
    return (
        <div>

            <RouterProvider router={appRouter} />

        </div>
    )
}

export default Body