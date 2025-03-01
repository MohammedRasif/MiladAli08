import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const PatientDetailsForm = () => {
    const [formData, setFormData] = useState({
        full_name: "", // Use full_name instead of name
        height: "",
        weight: "",
        gender: "",
        blood_group: "",
        age: "",
        medical_history: "", // Use medical_history instead of previous_allergies
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        // Prepare the data to match the expected format
        const postData = {
            full_name: formData.full_name,
            age: parseInt(formData.age, 10),
            height: parseFloat(formData.height).toFixed(2),
            weight: parseFloat(formData.weight).toFixed(2),
            gender: formData.gender,
            blood_group: formData.blood_group,
            medical_history: formData.medical_history,
        };

        try {
            // Send the data to the server
            const response = await fetch("http://192.168.10.131:8002/api/v1/patient/details/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Log the full response object
            console.log("Full Response Object:", response);
            console.log("Response Status:", response.status); // Log status code
            console.log("Response Headers:", response.headers); // Log headers
            console.log("Response OK:", response.ok); // Log whether response is ok

            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Success - Parsed Result:", result);

            // Extract unique_id (assuming it comes as 'id' in the response)
            const uniqueId = result.unique_id ; // Assuming the API returns an 'id' field
            if (uniqueId) {
                // Combine formData with the unique_id
                const updatedPatientDetails = {
                    ...formData,
                    id: uniqueId,
                };

                // Save updated data to localStorage
                localStorage.setItem("patientDetails", JSON.stringify(updatedPatientDetails));
                console.log("Saved to localStorage with unique_id:", updatedPatientDetails);
            } else {
                console.warn("No unique_id (id) found in API response");
                // Fallback: Save without unique_id if not found
                localStorage.setItem("patientDetails", JSON.stringify(formData));
            }

            // Navigate to the home page
            navigate("/");

            // Show a success message
            alert("Patient details saved successfully!");
        } catch (error) {
            console.error("Error:", error.message); // Log the error message
            alert("An error occurred while saving patient details. Please try again.");
        }
    };

    // Animation variants for the form
    const formVariants = {
        hidden: { y: "-100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 10, duration: 1.5 },
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
                            name="full_name" // Use full_name instead of name
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter here"
                            className="mt-1 block w-full p-2 border border-gray-300 bg-[#F7F7F7] rounded-md focus:ring-2 focus:ring-green-500"
                            required
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </div>
                    </div>

                    {/* Medical History Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Medical History (Optional)</label>
                        <textarea
                            name="medical_history" // Use medical_history instead of previous_allergies
                            value={formData.medical_history}
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