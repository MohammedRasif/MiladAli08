import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Removed unused FaRegEye, FaRegEyeSlash
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const SetNewPassword = () => {
    const { t } = useTranslation(); // Hook to get the translation function
    const [isEnglish, setIsEnglish] = useState(false); // State to track language
    const [showNewPassword, setShowNewPassword] = useState(false); // State for New Password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for Confirm Password visibility

    // Language setup and sync with localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        const initialLanguage = savedLanguage || "ar"; // Default to Arabic

        i18n.changeLanguage(initialLanguage); // Set initial language
        setIsEnglish(initialLanguage === "en"); // Update language state

        const handleLanguageChange = () => {
            setIsEnglish(i18n.language === "en");
        };

        i18n.on("languageChanged", handleLanguageChange); // Listen for language changes
        return () => {
            i18n.off("languageChanged", handleLanguageChange); // Cleanup
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto"
                        alt="Set New Password Image"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-medium text-center mb-5 text-[#364636]">
                        {t("set_new_password")}
                    </h1>
                    <p className="text-xl font-medium text-center mb-2 text-[#364636]">
                        {t("create_new_password_instruction")}
                    </p>

                    {/* Password Fields */}
                    <div className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="new-password" className="block text-base font-normal mb-2">
                                {t("new_password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="w-full h-12 border border-gray-300 px-4 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="****************"
                                />
                                <button
                                    type="button"
                                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-base font-normal mb-2">
                                {t("confirm_new_password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full h-12 border border-gray-300 px-4 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="****************"
                                />
                                <button
                                    type="button"
                                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error message placeholder */}
                    <p className="text-red-500 text-sm mt-3 text-center hidden">
                        {t("error_placeholder")}
                    </p>

                    {/* Confirm Button */}
                    <button
                        className="w-full h-12 mt-8 bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-base rounded-full transition-colors duration-200 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-400"
                    >
                        {t("confirm_password")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;