import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Register = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordsMatch) {
            setError(t("passwords_do_not_match"));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://192.168.10.131:3000/api/v1/accounts/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.name, // 'name' changed to 'full_name'
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.email || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            localStorage.setItem('userEmail', formData.email);
            // localStorage.setItem('unique_id',data.unique_id)
            navigate('/verification_sign_up'); // Redirect to verification_sign_up route
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 flex justify-center ">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto hidden md:block"
                        alt="Register Image"
                    />
                </div>

                <div className="w-full md:w-1/2" dir={isEnglish ? "ltr" : "rtl"}>
                    <h1 className="text-3xl md:text-5xl font-medium text-center">
                        {t("create_an_account")}
                    </h1>
                    <p className="text-sm font-medium text-center mt-4 md:mt-6 text-[#364636]">
                        {t("fill_in_details_to_register")}
                    </p>

                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-base block mb-2">{t("full_name")}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_full_name")}
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <label className="text-base block mb-2">{t("email")}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("enter_your_email")}
                                required
                            />
                        </div>

                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">{t("password")}</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("create_a_password")}
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

                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">{t("confirm_password")}</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder={t("confirm_your_password")}
                                required
                            />
                            <button
                                type="button"
                                className={`absolute top-1/2 transform translate-y-1 text-gray-500 ${isEnglish ? "right-3" : "left-3"}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {formData.confirmPassword && !passwordsMatch && (
                            <p className="text-sm text-red-600 mt-2">{t("passwords_do_not_match")}</p>
                        )}

                        {error && (
                            <p className="text-sm text-red-600 mt-2">{error}</p>
                        )}

                        {/* <div className="mt-4 flex flex-col gap-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 pr-2 text-sm text-gray-700 cursor-pointer">
                                    {t("agree_to_terms")}
                                </label>
                            </div>
                        </div> */}

                        <button
                            type="submit"
                            disabled={!passwordsMatch || loading}
                            className={`mt-8 w-full h-12 rounded-full text-base text-[#FAF1E6] transition-colors duration-200 ${passwordsMatch && !loading
                                ? 'bg-[#81db58] hover:bg-green-400 cursor-pointer'
                                : 'bg-[#81db58] hover:bg-green-400 '
                                }`}
                        >
                            {loading ? t("sign_up") : t("sign_up")}
                        </button>

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