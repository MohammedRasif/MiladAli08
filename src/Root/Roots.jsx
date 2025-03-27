import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "../component/Navbar/Navbar";
import Header from "../component/Shared/Header";

const Roots = () => {
  const location = useLocation(); // Get the current route's pathname

  // Define the routes where the Navbar should be visible
  const showNavbar = location.pathname === "/" || location.pathname === "/patientDetails";

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Roots;