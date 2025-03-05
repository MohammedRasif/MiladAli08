
"use client";

import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Navbar = () => {
  const location = useLocation();
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  // Update document direction and sync isEnglish when language changes
  useEffect(() => {
    const handleLanguageChange = () => {

      setIsEnglish(i18n.language === "en");
    };

    // Set initial direction
    handleLanguageChange();

    // Listen to language changes
    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language globally
    localStorage.setItem("language", lng); // Persist to localStorage
    setIsEnglish(lng === "en"); // Update local state
  };

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/disclaimer":
        return "Disclaimer";
      case "/patientDetails":
        return "Patient Details";
      default:
        return "Home";
    }
  };

  const activeTab = getActiveTab();

  const openAboutUsModal = () => setIsAboutUsModalOpen(true);
  const closeAboutUsModal = () => setIsAboutUsModalOpen(false);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const toggleLanguage = () => {
    changeLanguage(isEnglish ? "ar" : "en");
  };

  return (
    <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <img src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741104055/image_2025_03_04T15_57_39_367Z_ybfvoe.png" className="h-10 pl-5" alt="" />
        {/* <div className="bg-[#81db58] w-8 h-8 rounded-full border-2 border-[#D9D9D9]"></div>
        <h1 className="text-lg font-bold">{t("E-Hospital")}</h1> */}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-3 space-x-reverse">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Home" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Home")}
        </NavLink>
        <NavLink
          to="/disclaimer"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Disclaimer" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Disclaimer")}
        </NavLink>
        <NavLink
          to="/patientDetails"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Patient Details" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Patient Details")}
        </NavLink>

        <button onClick={openAboutUsModal}>
          <h1 className="text-[16px] font-[600] bg-[#C6D7BA] px-5 py-2 rounded-md border border-gray-400 ml-10">
            {t("About us")}
          </h1>
        </button>
      </div>

      {/* Language Toggle */}
      <div className="relative">
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-between border border-gray-300  rounded-full px-2 py-1 w-[140px] h-[40px] relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
          aria-label={`Switch to ${isEnglish ? "Arabic" : "English"} language`}
        >
          {/* Arabic option */}
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${!isEnglish ? "text-white pl-3 " : "text-gray-600"
              }`}
          >
            عربي
          </span>

          {/* Toggle indicator */}
          <motion.div
            className="absolute top-1 h-[32px] rounded-full z-0 bg-[#81db58] "
            animate={{
              left: isEnglish ? "calc(50% - 2px)" : "2px",
              right: isEnglish ? "2px" : "calc(50% - 2px)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* English option */}
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${isEnglish ? "text-white mr-1" : "text-gray-600"
              }`}
          >
            English
          </span>
        </button>
      </div>

      {/* About Us Modal */}
      {isAboutUsModalOpen && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <motion.div
            className="w-[690px] h-[350px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex items-center text-[18px] font-[500] text-gray-700 absolute -top-20 ${i18n.language === "ar" ? "left-5" : "left-5"
                } cursor-pointer`}
              onClick={closeAboutUsModal}
            >
              <IoIosArrowRoundBack
                className={`text-[28px] ${i18n.language === "ar" ? "ml-1 transform rotate-180" : "mr-1"
                  }`}
              />
              <h1>{t("Back")}</h1>
            </div>
            {/* <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740756752/Objects_eszpyt.png"
              alt="Dedication"
            /> */}
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        {t("welcome_title")}
      </h1>
      <p className="mt-4 text-lg text-center">{t("welcome_description")}</p>

      <p className="mt-4 text-gray-700">{t("platform_purpose")}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-500">
          {t("what_we_offer")}
        </h2>
        <ul className="mt-2 space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✅</span>
            {t("symptom_checker")}
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✅</span>
            {t("report_analysis")}
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✅</span>
            {t("health_assistant_24_7")}
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <p className="text-gray-800 font-semibold">
          ⚠️ {t("disclaimer_note")}
        </p>
      </div>

      <p className="mt-6 text-center text-gray-700">{t("contact_us")}</p>
      <p className="text-center text-blue-600 font-semibold">
        📩 {t("contact_email")}
      </p>
    </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;

