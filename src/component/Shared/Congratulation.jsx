import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Congratulation = () => {
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
        <div>
            <div className="flex max-w-6xl mx-auto items-center  pt-36 space-x-10" >
                {/* Image Section - Takes more width */}
                <div className="flex-2 pt-20 w-1/2">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-[483px] h-[450px]"
                        alt="Congratulation Image"
                    />
                </div>
                {/* Content Section - Takes remaining width */}
                <div className="flex-1 pt-36 w-1/2 ">
                    {/* Content */}
                    <div className=" text-center font-montserrat font-normal text-[20px] leading-[30px] mb-10">
                        <h1 className="font-[500] text-[20px] leading-[30px] text-center mb-2">
                            <p>{t("password_updated")}</p>
                            <p>{t("change_password_regularly")}</p>
                        </h1>
                        <h1 className="text-[48px] font-[500] text-center py-10">
                            {t("congratulations")}
                        </h1>
                    </div>
                    {/* Login Button */}
                    <div className="mt-10 mb-12">
                        <NavLink to="/">
                            <button
                                className="w-[481px] h-[54px] rounded-[30px] px-[20px] py-[14px] gap-[10px] bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-base cursor-pointer"
                            >
                                {t("home")}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Congratulation;