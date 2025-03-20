import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Verification = () => {
    const { t } = useTranslation(); // Hook to get the translation function
    const [isEnglish, setIsEnglish] = useState(false); // State to track language
    const inputs = useRef([]);

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

    // Handle input change and auto-focus
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        
        // If a digit is entered, move to next input
        if (value.length === 1 && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    // Handle backspace/delete and move to previous input
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    // Handle paste functionality
    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text').slice(0, 4); // Limit to 4 digits
        if (/^\d{0,4}$/.test(pastedData)) { // Check if it's numbers only
            pastedData.split('').forEach((char, i) => {
                if (inputs.current[i]) {
                    inputs.current[i].value = char;
                }
            });
            // Focus the last filled input or the last one if paste is incomplete
            const nextFocus = Math.min(pastedData.length, 3);
            inputs.current[nextFocus].focus();
        }
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto"
                        alt="Verification Image"
                    />
                </div>

                {/* Verification Section */}
                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    <h1 className="font-medium text-center mt-4 md:mt-6 text-[#364636] text-5xl">
                        {t("congratulations")}
                    </h1>
                    <p className="text-sm font-medium text-center mt-4 md:mt-6 text-[#364636]">
                        {t("enter_4_digit_code")}
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center mt-10 space-x-4">
                        {[0, 1, 2, 3].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? handlePaste : null} // Only allow paste on first input
                                className="w-12 h-12 text-center border rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#8CAB91] bg-gray-200"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        className="w-full mt-8 h-12 rounded-full bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-base cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {t("verify")}
                    </button>

                    {/* Resend Option */}
                    <p className="text-center text-sm mt-5 text-[#364636]">
                        {t("not_received_email")}{" "}
                        <NavLink to="/forgetPassword" className="text-blue-400 hover:underline cursor-pointer">
                            {t("resend")}
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Verification;