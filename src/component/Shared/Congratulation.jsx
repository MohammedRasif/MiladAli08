import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Congratulation = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        const initialLanguage = savedLanguage || "ar";
        i18n.changeLanguage(initialLanguage);
        setIsEnglish(initialLanguage === "en");

        const handleLanguageChange = () => {
            setIsEnglish(i18n.language === "en");
        };

        i18n.on("languageChanged", handleLanguageChange);
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12 bg-gray-50">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[483px] h-auto object-contain"
                        alt="Congratulation Image"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center" dir={isEnglish ? "ltr" : "rtl"}>
                    <div className="font-montserrat space-y-4 md:space-y-6">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                            <p>{t("password_updated")}</p>
                            <p>{t("change_password_regularly")}</p>
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-green-600 py-4 md:py-6">
                            {t("congratulations")}
                        </h1>
                    </div>

                    {/* Home Button */}
                    <div className="mt-6 md:mt-10 mb-8">
                        <NavLink to="/">
                            <button
                                className="   h-12 ] rounded-full px-5 py-3 bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-sm md:text-base transition-colors duration-200"
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