import { useState } from "react";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home"); // Default active tab "Home"

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the clicked tab as active
    };
    return (
        <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
            <div className="flex items-center space-x-2">
                <div className="bg-[#006400] p-3 rounded-full border-2 border-[#D9D9D9]">

                </div>
                <div>
                    <h1 className="">E- Hospital</h1>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <h1
                    onClick={() => handleTabClick("Home")}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Home"
                            ? "bg-[#006400] text-white "
                            : "bg-transparent text-black"
                        }`}
                >
                    Home
                </h1>
                <h1
                    onClick={() => handleTabClick("Disclaimer")}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Disclaimer"
                            ? "bg-[#006400] text-white "
                            : "bg-transparent text-black"
                        }`}
                >
                    Disclaimer
                </h1>
                <h1
                    onClick={() => handleTabClick("Patient Details")}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Patient Details"
                            ? "bg-[#006400] text-white "
                            : "bg-transparent text-black"
                        }`}
                >
                    Patient Details
                </h1>
            </div>
            <div>
                <h1>E- Hospital</h1>
            </div>
        </div>
    );
}

export default Navbar;
