import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Assuming this is your i18n config file

const PatientDetailsForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    diabetes: "",
    high_blood_pressure: "",
    taking_medications: "",
    list_of_medications: "",
    reported_symptoms: "",
    additional_health_conditions: "",
    country: "",
    family_history:"",
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform form data to match API structure
    const transformedData = {
      age: parseInt(formData.age, 10),
      sex: formData.sex,
      diabetes: formData.diabetes === "Yes",
      high_blood_pressure: formData.high_blood_pressure === "Yes",
      taking_medications: formData.taking_medications === "Yes",
      medications: formData.list_of_medications || "",
      reported_symptoms: formData.reported_symptoms || "",
      additional_health_conditions: formData.additional_health_conditions || "",
      country: formData.country,
      family_history:formData.family_history,
      // ip_address: await fetchUserIP() || "Unknown",
    };

    console.log("Form submitted data:", transformedData); // Log the submitted data

    try {
      const response = await fetch("https://www.backend.e-clinic.ai/api/v1/patient/details/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success - Parsed Result:", result);

      const uniqueId = result.unique_id;
      if (uniqueId) {
        const updatedPatientDetails = {
          ...transformedData,
          id: uniqueId,
        };
        localStorage.setItem("unique_id",uniqueId)
        console.log("Saved to localStorage with unique_id:", updatedPatientDetails);
      } else {
        console.warn("No unique_id found in API response");
        localStorage.setItem("patientDetails", JSON.stringify(transformedData));
      }

      // Construct URL with form data
      const queryParams = new URLSearchParams(transformedData).toString();
      const url = `http://your-api-endpoint.com/patient?${queryParams}`;
      console.log("Generated URL:", url);

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
  

  const Fetchpatient = async()=>{
    const id = localStorage.getItem("unique_id")
    try {
      const response = await fetch(`https://www.backend.e-clinic.ai/api/v1/patient/info/${id}`);
      const data = await response.json();
     
      
      setFormData(
        {
          age: data.age,
          sex: data.sex,
          diabetes: data.diabetes,
          high_blood_pressure: data.high_blood_pressure,
          taking_medications: data.taking_medications,
          list_of_medications: data.list_of_medications,
          reported_symptoms: data.reported_symptoms,
          additional_health_conditions: data.additional_health_conditions,
          country: data.country,
          family_history:data.family_history,
        }
      )
     
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    
    Fetchpatient()
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-12" style={{ backdropFilter: "blur(5px)" }}>
      <motion.div
        className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
        style={{ width: "540px" }}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <NavLink
          to="/"
          className="flex items-center text-[18px] font-semibold text-gray-700 hover:text-[#006400] transition duration-200"
        >
          <IoIosArrowRoundBack
            className={`text-[28px] ${i18n.language === "ar" ? "ml-1 transform  mt-2" : "mr-1"}`}
          />
          <span>{t("Back")}</span>
        </NavLink>

        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6 mt-4">{t("Patient Details")}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Age Field */}
          <div className="flex items-center space-x-3">
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">{t("Age")}</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
                required
                min="0"
              />
            </div>

            {/* Sex Field */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">{t("Sex")}</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200 appearance-none"
                required
              >
                <option value="" disabled>{t("Select Sex")}</option>
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
              </select>
            </div>

           
          </div>

          {/* Diabetes Field */}
          <div className="flex items-center space-x-3">
            {/* High Blood Pressure Field */}
            

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">{t("Are They Taking Any Medications?")}</label>
              <select
                name="taking_medications"
                value={formData.taking_medications}
                onChange={handleChange}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200 appearance-none"
                required
              >
                <option value="" disabled>{t("Select")}</option>
                <option value="Yes">{t("Yes")}</option>
                <option value="No">{t("No")}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">{t("List of Medications (if any)")}</label>
            <input
              type="text"
              name="list_of_medications"
              value={formData.list_of_medications}
              onChange={handleChange}
              placeholder={t("Enter here")}
              className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
            />
          </div>
          <div className="flex items-center space-x-3">
          <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">{t("High Blood Pressure")}</label>
              <select
                name="high_blood_pressure"
                value={formData.high_blood_pressure}
                onChange={handleChange}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200 appearance-none"
                required
              >
                <option value="" disabled>{t("Select Pressure")}</option>
                <option value="Yes">{t("Yes")}</option>
                <option value="No">{t("No")}</option>
              </select>
            </div>

          <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">{t("Diabetes")}</label>
              <select
                name="diabetes"
                value={formData.diabetes}
                onChange={handleChange}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200 appearance-none"
                required
              >
                <option value="" disabled>{t("Select Diabetes")}</option>
                <option value="Yes">{t("Yes")}</option>
                <option value="No">{t("No")}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Additional Health Conditions Field */}
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">{t("Health Conditions (if any)")}</label>
              <input
                type="text"
                name="additional_health_conditions"
                value={formData.additional_health_conditions}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
              />
            </div>

            {/* Country Field */}
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">{t("Country")}</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
                required
              />
            </div>
          </div>

          {/* List of Medications Field */}
         

          {/* Reported Symptoms Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">{t("Reported Symptoms")}</label>
            <textarea
              name="reported_symptoms"
              value={formData.reported_symptoms}
              onChange={handleChange}
              placeholder={t("Type here")}
              className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
            />
          </div>
          <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">{t("Allergies or Family History")}</label>
              <input
                type="text"
                name="family_history"
                value={formData.family_history}
                onChange={handleChange}
                placeholder={t("Enter here")}
                className="mt-2 block w-full p-[8px] border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition duration-200"
                
              />
            </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#81db58] text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold shadow-md hover:shadow-lg mt-6"
          >
            {t("Submit")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientDetailsForm;