import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Register = () => {
    const { t } = useTranslation(); // Hook to get the translation function
    const [isEnglish, setIsEnglish] = useState(false); // State to track language
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Check if passwords match
    const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

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
                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    <h1 className="text-3xl md:text-5xl font-medium text-center">
                        {t("create_an_account")}
                    </h1>
                    <p className="text-sm font-medium text-center mt-4 md:mt-6 text-[#364636]">
                        {t("fill_in_details_to_register")}
                    </p>

                    <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Field */}
                        <div>
                            <label className="text-base block mb-2">{t("full_name")}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_full_name")}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mt-6">
                            <label className="text-base block mb-2">{t("email")}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_email")}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">{t("password")}</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("create_a_password")}
                            />
                            <button
                                type="button"
                                className={`absolute top-1/2 transform translate-y-1 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">{t("confirm_password")}</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("confirm_your_password")}
                            />
                            <button
                                type="button"
                                className={`absolute top-1/2 transform translate-y-1 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Password Match Error */}
                        {formData.confirmPassword && !passwordsMatch && (
                            <p className="text-sm text-red-600 mt-2">{t("passwords_do_not_match")}</p>
                        )}

                        {/* Terms Checkbox */}
                        <div className="mt-4 flex flex-col gap-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="terms" className="ml-2 pr-2 text-sm text-gray-700 cursor-pointer">
                                    {t("agree_to_terms")}
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!passwordsMatch}
                            className={`mt-8 w-full h-12 rounded-full text-base text-[#FAF1E6] transition-colors duration-200 cursor-pointer ${passwordsMatch
                                ? 'bg-[#81db58] hover:bg-green-400'
                                : 'bg-[#81db58] hover:bg-green-400'
                                }`}
                        >
                            {t("sign_up")}
                        </button>

                        {/* Login Link */}
                        <p className="mt-4 text-sm text-center text-gray-700">
                            {t("already_have_account")}{' '}
                            <NavLink to="/login" className="text-red-600 hover:text-red-700">
                                {t("sign_in")}
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;