import React from 'react'
import Login from './Login.jsx'
import Browse from './Browse.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([
        {

        path: "/",
        element:<Login/>       
     },
     {
        path:"/browse",
        element:<Browse />
     }
    ])
    return (
        <div>

           <RouterProvider router={appRouter} />

        </div>
    )
}

export default Body