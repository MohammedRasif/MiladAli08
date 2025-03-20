import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const ForgetPassword = () => {
    const { t } = useTranslation(); // Hook to get the translation function
    const [isEnglish, setIsEnglish] = useState(false); // State to track language

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
                        alt="Forgot Password Image"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    <h1 className="text-3xl md:text-4xl font-medium text-[#364636] text-center">
                        {t("forgot_password")}
                    </h1>
                    <form className="mt-8">
                        <div>
                            <label className="text-base block mb-2">{t("email")}</label>
                            <input
                                type="email"
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_email")}
                            />
                        </div>
                        {/* Placeholder for error message */}
                        <p className="text-red-500 mt-2 text-center hidden">
                            {t("error_message_placeholder")}
                        </p>
                        <button
                            type="submit"
                            className="mt-8 bg-[#81db58] hover:bg-green-400 w-full h-12 rounded-full text-base text-[#FAF1E6] uppercase transition-colors duration-200 cursor-pointer"
                        >
                            {t("confirm")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;