import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import ErrorPage from "./component/ErrorPage/ErrorPage.jsx";
import PatientDetails from "./component/Shared/PatientDetails.jsx";
import Roots from "./Root/Roots.jsx";  // ✅ Import the correct file
import Home from "./component/Shared/Home.jsx";  // ✅ Import the correct file
import Disclaimer from "./component/Shared/Disclaimer.jsx";
import "./i18n.js"
import Login from "./component/Login/Login.jsx";
import Register from "./component/Register/Register.jsx";
import ForgetPassword from "./component/Shared/ForgetPassword.jsx";
import Verification from "./component/Shared/Verification.jsx";
import SetNewPassword from "./component/Shared/SetNewPassword.jsx";
import Congratulation from "./component/Shared/Congratulation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,  
    // errorElement: <ErrorPage />,
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
      {
        path: "/register",  
        element: <Register />,
      },
      {
        path: "/forgetPassword",  
        element: <ForgetPassword />,
      },
      {
        path: "/verification",  
        element: <Verification />,
      },
      {
        path: "/setNewPassoword",  
        element: <SetNewPassword />,
      },
      {
        path: "/congratulation",  
        element: <Congratulation />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
 
   
    <RouterProvider router={router} />
    
  
);
