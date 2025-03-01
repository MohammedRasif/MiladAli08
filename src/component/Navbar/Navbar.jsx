import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation for route tracking
import { motion } from "framer-motion"; // For modal animation
import { IoIosArrowRoundBack } from "react-icons/io";

const Navbar = () => {
    const location = useLocation(); // Hook to get the current route
    const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false); // State for About us modal

    // Determine the active tab based on the current route
    const getActiveTab = () => {
        switch (location.pathname) {
            case "/":
                return "Home";
            case "/disclaimer":
                return "Disclaimer";
            case "/patientDetails":
                return "Patient Details";
            default:
                return "Home";
        }
    };

    const activeTab = getActiveTab(); // Get the active tab

    const openAboutUsModal = () => {
        setIsAboutUsModalOpen(true); // Open About us modal
    };

    const closeAboutUsModal = () => {
        setIsAboutUsModalOpen(false); // Close About us modal
    };

    // Modal animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 },
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    return (
        <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <div className="bg-[#006400] w-8 h-8 rounded-full border-2 border-[#D9D9D9]"></div>
                <div>
                    <h1 className="text-lg font-bold">E-Hospital</h1>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-3">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            activeTab === "Home" ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/disclaimer"
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            activeTab === "Disclaimer" ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Disclaimer
                </NavLink>
                <NavLink
                    to="/patientDetails"
                    className={({ isActive }) =>
                        `cursor-pointer px-4 py-2 rounded-md transition-all ${
                            activeTab === "Patient Details" ? "bg-[#006400] text-white" : "bg-transparent text-black"
                        }`
                    }
                >
                    Patient Details
                </NavLink>
            </div>

            {/* Right Section - About us Button */}
            <button onClick={openAboutUsModal}>
                <h1 className="text-[16px] font-[600] bg-[#C6D7BA] px-5 py-2 rounded-md border border-gray-400">
                    About us
                </h1>
            </button>

            {/* About us Modal */}
            {isAboutUsModalOpen && (
                <motion.div
                    className="fixed inset-0 flex justify-center items-center z-50"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25 }}
                >
                    <motion.div
                        className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Back Button */}
                        <div
                            className="flex items-center text-[18px] font-[500] text-gray-700 absolute top-5 left-5 cursor-pointer"
                            onClick={closeAboutUsModal}
                        >
                            <IoIosArrowRoundBack className="text-[28px] mr-1" />
                            <h1>Back</h1>
                        </div>

                        <img
                            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740756752/Objects_eszpyt.png"
                            alt="Dedication"
                        />
                        <h1 className="text-[18px] font-[500] mt-2">
                            About us content goes here.
                        </h1>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;