import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SetNewPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto"
                        alt="Register Image"
                    />
                </div>


                {/* Form Section */}
                <div className="w-full md:w-1/2 ">
                    {/* Title */}
                    <p className="text-xl font-medium text-center mb-2 text-[#364636]">
                        Create a new password. <br />
                        Ensure it differs from the previous one.
                    </p>
                    <h1 className="text-3xl md:text-5xl font-medium text-center text-[#364636]">
                        Set New Password
                    </h1>

                    {/* Password Fields */}
                    <div className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="new-password" className="block text-base font-normal mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full h-12 border border-gray-300 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="****************"
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                                    <FaRegEyeSlash />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-base font-normal mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full h-12 border border-gray-300 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="****************"
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                                    <FaRegEyeSlash />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Error message placeholder */}
                    <p className="text-red-500 text-sm mt-3 text-center hidden">Error placeholder</p>

                    {/* Confirm Button */}
                    <button
                        className="w-full h-12 mt-8 bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-base rounded-full  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Confirm Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;