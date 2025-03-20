import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl md:text-5xl font-medium text-center">Create an Account</h1>
                    <p className="text-sm font-medium text-center mt-4 md:mt-6 text-[#364636]">
                        Please fill in the details to register
                    </p>

                    <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Field */}
                        <div>
                            <label className="text-base block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mt-6">
                            <label className="text-base block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform translate-y-1 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mt-6 relative">
                            <label className="text-base block mb-2">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform translate-y-1 text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Password Match Error */}
                        {formData.confirmPassword && !passwordsMatch && (
                            <p className="text-sm text-red-600 mt-2">Passwords do not match</p>
                        )}

                        {/* Terms Checkbox */}
                        <div className="mt-4 flex flex-col gap-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-700 cursor-pointer">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!passwordsMatch}
                            className={`mt-8 w-full h-12 rounded-full text-base text-[#FAF1E6] transition-colors duration-200 cursor-pointer ${
                                passwordsMatch 
                                    ? 'bg-[#81db58] hover:bg-green-400' 
                                    : 'bg-[#81db58] hover:bg-green-400'
                            }`}
                        >
                            SIGN UP
                        </button>

                        {/* Login Link */}
                        <p className="mt-4 text-sm text-center text-gray-700">
                            Already have an account?{' '}
                            <NavLink to="/login" className="text-red-600 hover:text-red-700">
                                Sign In
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;