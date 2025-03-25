import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Verification = () => {
    const { t } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits
    const [error, setError] = useState(null); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading
    const inputs = useRef([]);
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

    // Handle input change and auto-focus
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) { // Only allow single digit
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value.length === 1 && index < 3) {
                inputs.current[index + 1].focus();
            }
        }
    };

    // Handle backspace/delete and move to previous input
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    // Handle paste functionality
    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (/^\d{0,4}$/.test(pastedData)) {
            const newOtp = ['', '', '', ''];
            pastedData.split('').forEach((char, i) => {
                newOtp[i] = char;
                if (inputs.current[i]) {
                    inputs.current[i].value = char;
                }
            });
            setOtp(newOtp);
            const nextFocus = Math.min(pastedData.length, 3);
            inputs.current[nextFocus].focus();
        }
        e.preventDefault();
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('forgetEmail'); // Get email from localStorage
        const otpCode = otp.join(''); // Combine OTP digits

        if (!email) {
            setError(t("email_not_found"));
            return;
        }

        if (otpCode.length !== 4) {
            setError(t("enter_full_otp"));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://192.168.10.131:3000/api/v1/accounts/reset-request-activate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, // Send as "email"
                    otp: otpCode // Send OTP
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Verification failed');
            }

            const data = await response.json();
            console.log('Verification successful:', data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('unique_id',data.unique_id)

            navigate('/setNewPassoword');
        } catch (err) {
            setError(err.message || 'Verification failed. Please try again.');
            console.error('Verification error:', err);
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center mt-10 space-x-4">
                            {[0, 1, 2, 3].map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index]}
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={index === 0 ? handlePaste : null}
                                    className="w-12 h-12 text-center border rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#8CAB91] bg-gray-200"
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-600 text-center mt-4">{error}</p>
                        )}

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-8 h-12 rounded-full text-base text-[#FAF1E6] font-medium transition-colors duration-200 ${loading
                                ? 'bg-[#81db58] hover:bg-green-400'
                                : 'bg-[#81db58] hover:bg-green-400 cursor-pointer'
                                }`}
                        >
                            {loading ? t("verify") : t("verify")}
                        </button>
                    </form>

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