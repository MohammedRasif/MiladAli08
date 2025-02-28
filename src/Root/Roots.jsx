import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import Sidebar from "../component/Sidebar/Sidebar";

const Roots = () => {
    // State to manage sidebar open/close
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // <div className="flex h-screen">
        //     {/* Sidebar */}
        //     <div
        //         style={{ width: isSidebarOpen ? '280px' : '50px' }}
        //         className="bg-[#FAF1E6] h-full fixed transition-all duration-300"
        //     >
        //         <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        //     </div>

        //     {/* Main content area */}
        //     <div
        //         style={{ marginLeft: isSidebarOpen ? '280px' : '50px' }}
        //         className="flex flex-col w-full transition-all duration-300"
        //     >
        //         {/* Scrollable Content Area */}
        //         <div className="h-full mt-16 overflow-auto p-5 bg-gray-100">
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
        <div>
            
        </div>
    );
};

export default Roots;