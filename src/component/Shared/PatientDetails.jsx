import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Assuming this is your i18n config file

const PatientDetailsForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    height: "",
    weight: "",
    gender: "",
    blood_group: "",
    age: "",
    medical_history: "",
    diabetes: false,
    high_blood_pressure: false,
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const postData = {
      full_name: formData.full_name,
      age: parseInt(formData.age, 10),
      height: parseFloat(formData.height).toFixed(2),
      weight: parseFloat(formData.weight).toFixed(2),
      gender: formData.gender,
      blood_group: formData.blood_group,
      medical_history: formData.medical_history,
      diabetes: formData.diabetes,
      high_blood_pressure: formData.high_blood_pressure,
    };

    try {
      const response = await fetch("http://192.168.10.131:8002/api/v1/patient/details/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success - Parsed Result:", result);

      const uniqueId = result.unique_id; // Assuming the API returns 'unique_id'
      if (uniqueId) {
        const updatedPatientDetails = {
          ...formData,
          id: uniqueId,
        };
        localStorage.setItem("patientDetails", JSON.stringify(updatedPatientDetails));
        console.log("Saved to localStorage with unique_id:", updatedPatientDetails);
      } else {
        console.warn("No unique_id found in API response");
        localStorage.setItem("patientDetails", JSON.stringify(formData));
      }

      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      alert(t("An error occurred while saving patient details. Please try again."));
    }
  };

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
      <motion.div
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-2xl"
        style={{ width: "576px" }}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <NavLink
          to="/"
          className={`flex items-center text-[18px] font-[500] text-gray-700 ${i18n.language === "ar" ? "justify-end" : "justify-start"
            }`}
        >
          <IoIosArrowRoundBack
            className={`text-[28px] ${i18n.language === "ar" ? "ml-1 transform rotate-180" : "mr-1"}`}
          />
          <h1>{t("Back")}</h1>
        </NavLink>

        <h2 className="text-[24px] text-center font-semibold mb-4">{t("Patient Details")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("Name")}</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder={t("Enter here")}
              className="mt-1 block w-full p-2 border border-gray-300 bg-[#F7F7F7] rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Height and Weight Fields */}
          <div className={`flex space-x-4 ${i18n.language === "ar" ? "space-x-reverse" : ""}`}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">{t("Height")}</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">{t("Weight")}</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Gender, Blood Group, and Age Fields */}
          <div className={`flex space-x-4 ${i18n.language === "ar" ? "space-x-reverse" : ""}`}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">{t("Gender")}</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F7F7F7] focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="diabetes"
                name="diabetes"
                checked={formData.diabetes}
                onChange={handleChange}
                className="h-5 w-5 border-gray-300 rounded accent-[#006400] checked:bg-[#006400] checked:text-white focus:ring-[#006400] cursor-pointer"
              />
              <label htmlFor="diabetes" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 cursor-pointer">
                Diabetes
              </label>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="high_blood_pressure"
                name="high_blood_pressure"
                checked={formData.high_blood_pressure}
                onChange={handleChange}
                className="h-5 w-5 border-gray-300 rounded accent-[#006400] checked:bg-[#006400] checked:text-white focus:ring-[#006400] cursor-pointer"
              />
              <label htmlFor="high_blood_pressure" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 cursor-pointer">
                High blood pressure
              </label>
            </div>
          </div>

          {/* Medical History Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("Medical History (Optional)")}</label>
            <textarea
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
              placeholder={t("Type here")}
              className="mt-1 block w-full p-2 border border-gray-300 bg-[#F7F7F7] rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#006400] text-white p-2 rounded-md hover:bg-green-900 transition cursor-pointer"
          >
            {t("Submit")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientDetailsForm;