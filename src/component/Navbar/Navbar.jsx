import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home"); // Default active tab "Home"

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the clicked tab as active
    };

    return (
        <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <div className="bg-[#006400] p-3 rounded-full border-2 border-[#D9D9D9]"></div>
                <div>
                    <h1>E- Hospital</h1>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-3">
                <NavLink
                    to="/"
                    onClick={() => handleTabClick("Home")}
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            isActive ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/disclaimer"
                    onClick={() => handleTabClick("Disclaimer")}
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            isActive ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Disclaimer
                </NavLink>
                <NavLink
                    to="/patientDetails"
                    onClick={() => handleTabClick("Patient Details")}
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            isActive ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Patient Details
                </NavLink>
            </div>

            {/* Right Section */}
            <div>
                <h1>E- Hospital</h1>
            </div>
        </div>
    );
};

export default Navbar;