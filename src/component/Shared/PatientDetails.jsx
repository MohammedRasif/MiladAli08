import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const PatientDetailsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        height: "",
        weight: "",
        gender: "",
        blood_group: "",
        age: "",
        previous_allergies: "",
    });

    const navigate = useNavigate(); // Corrected variable name

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        // Save form data to localStorage
        localStorage.setItem("patientDetails", JSON.stringify(formData));

        // Navigate to the home page
        navigate("/");

        // Optionally, you can show a success message or modal here
        alert("Patient details saved successfully!");
    };

    // Animation variants for the form
    const formVariants = {
        hidden: { y: "-100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 10, duration: 1.5 }, // More bouncy
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backdropFilter: "blur(10px)" }}>
            {/* Form Container */}
            <motion.div
                className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-2xl"
                style={{ width: "576px" }}
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <NavLink to="/" className="flex items-center text-[18px] font-[500] text-gray-700">
                    <IoIosArrowRoundBack className="text-[28px]" />
                    <h1>Back</h1>
                </NavLink>

                <h2 className="text-[24px] text-center font-semibold mb-4">Patient Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter here"
                            className="mt-1 block w-full p-2 border border-gray-300 bg-[#F7F7F7] rounded-md focus:ring-2 focus:ring-green-500"
                            required // Ensure the field is required
                        />
                    </div>

                    {/* Height and Weight Fields */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Height</label>
                            <input
                                type="text"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                placeholder="Enter here"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                                required // Ensure the field is required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Weight</label>
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="Enter here"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                                required // Ensure the field is required
                            />
                        </div>
                    </div>

                    {/* Gender, Blood Group, and Age Fields */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                placeholder="Enter here"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                                required // Ensure the field is required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                            <input
                                type="text"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                placeholder="Enter here"
                                className="mt-1 block w-full p-2 border bg-[#F7F7F7] border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                                required // Ensure the field is required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter here"
                                className="mt-1 block w-full p-2 border bg-[#F7F7F7] border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                                required // Ensure the field is required
                            />
                        </div>
                    </div>

                    {/* Medical History Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Previous Allergies (Optional)</label>
                        <textarea
                            name="previous_allergies"
                            value={formData.previous_allergies}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="mt-1 block w-full p-2 border border-gray-300 bg-[#F7F7F7] rounded-md focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#006400] text-white p-2 rounded-md hover:bg-green-900 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default PatientDetailsForm;