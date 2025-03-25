import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Login = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        try {
            const response = await fetch('http://192.168.10.131:3000/api/v1/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            console.log(response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.email || 'Login failed');
                
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Save access_token to localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('unique_id',data.unique_id)

            // Navigate to home page
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
            console.error('Login error:', err);
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
                        alt="Login Image"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    <h1 className="text-3xl md:text-5xl font-medium text-center">
                        {t("Login to Account")}
                    </h1>
                    <p className="text-sm font-medium text-center mt-4 md:mt-6 text-[#364636]">
                        {t("Please enter your email and password to continue")}
                    </p>

                    <form className="mt-8" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label className="text-base block mb-2">{t("email")}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_email")}
                                required
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
                                placeholder="****************"
                                required
                            />
                            <button
                                type="button"
                                className={`absolute top-1/2 transform translate-y-1 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-600 mt-4">{error}</p>
                        )}

                        {/* Remember Me and Forgot Password */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember" className="ml-2 pr-2 text-sm text-gray-700 cursor-pointer">
                                    {t("remember_me")}
                                </label>
                            </div>
                            <NavLink to="/forgetPassword" className="text-sm text-red-600 hover:text-red-700">
                                {t("forgot_password")}
                            </NavLink>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-8 w-full h-12 rounded-full text-base text-[#FAF1E6] transition-colors duration-200 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#81db58] hover:bg-green-400 cursor-pointer'
                                }`}
                        >
                            {loading ? t("sign_in") : t("sign_in")}
                        </button>

                        <p className="mt-4 text-sm text-center text-gray-700">
                            {t("Don’t have account?")}{' '}
                            <NavLink to="/register" className="text-red-600 hover:text-red-700">
                                {t("sign_up")}
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;