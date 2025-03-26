import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const SetNewPassword = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading
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

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError(t("passwords_do_not_match"));
            setLoading(false);
            return;
        }

        // Get access_token from localStorage
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            setError(t("no_access_token_found"));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://192.168.10.131:3000/api/v1/accounts/reset-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Sending access_token in headers
                },
                body: JSON.stringify({
                    new_password: formData.newPassword // Sending new_password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Password reset failed');
            }

            const data = await response.json();
            console.log('Password reset successful:', data);

            // Navigate to /congratulation route on success
            navigate('/congratulation');
        } catch (err) {
            setError(err.message || 'Password reset failed. Please try again.');
            console.error('Password reset error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto"
                        alt="Set New Password Image hidden md:block"
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
                    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="new-password" className="block text-base font-normal mb-2">
                                {t("new_password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full h-12 border border-gray-300 px-4 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="****************"
                                    required
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
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full h-12 border border-gray-300 px-4 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="****************"
                                    required
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

                        {/* Error message */}
                        {error && (
                            <p className="text-red-500 text-sm mt-3 text-center">
                                {error}
                            </p>
                        )}

                        {/* Confirm Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-12 mt-8 text-base text-[#FAF1E6] font-medium rounded-full transition-colors duration-200 ${loading
                                ? 'bg-[#81db58] hover:bg-green-400'
                                : 'bg-[#81db58] hover:bg-green-400 cursor-pointer'
                                }`}
                        >
                            {loading ? t("confirm_password") : t("confirm_password")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;