import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import i18n from "../../i18n";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Added navigate hook

    // Language setup and sync with localStorage
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

    // Handle email input change
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://backend.e-clinic.ai/api/v1/accounts/password-reset-request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.email || 'Reset request failed');
            }

            const data = await response.json();
            console.log('Reset request successful:', data);

            // Save email to localStorage as forgetEmail
            localStorage.setItem('forgetEmail', email);

            // Navigate to /verification route
            navigate('/verification');

            setError(null);
        } catch (err) {
            setError(err.message || 'Reset request failed. Please try again.');
            console.error('Reset request error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center hidden md:block">
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
                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-base block mb-2">{t("email")}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_email")}
                                required
                            />
                        </div>
                        {/* Error or Success Message */}
                        {error && (
                            <p className="text-red-500 mt-2 text-center">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-8 w-full h-12 rounded-full text-base text-[#FAF1E6] uppercase transition-colors duration-200 ${loading
                                    ? 'bg-[#81db58] hover:bg-green-400'
                                    : 'bg-[#81db58] hover:bg-green-400 cursor-pointer'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-[#FAF1E6]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span className="animate-pulse">Loading...</span>
                                </span>
                            ) : (
                                t("confirm")
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;