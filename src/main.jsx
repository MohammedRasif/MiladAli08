import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./component/ErrorPage/ErrorPage.jsx";
import PatientDetails from "./component/Shared/PatientDetails.jsx";
import Roots from "./Root/Roots.jsx";  // ✅ Import the correct file
import Home from "./component/Shared/Home.jsx";  // ✅ Import the correct file
import Disclaimer from "./component/Shared/Disclaimer.jsx";
import "./i18n.js"
import Login from "./component/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,  
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",  
        element:<Home/>
      },
      {
        path: "/patientDetails",  
        element: <PatientDetails />,
      },
      {
        path: "/disclaimer",  
        element: <Disclaimer />,
      },
      {
        path: "/login",  
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
 
   
    <RouterProvider router={router} />
    
  
);
