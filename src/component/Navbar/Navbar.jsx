"use client";

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Navbar = () => {
  const location = useLocation();
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      localStorage.removeItem("access_token");
      // localStorage.removeItem("patientDetails");
      localStorage.removeItem("unique_id");
     
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://backend.e-clinic.ai/api/v1/accounts/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      console.log("Logout successful");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("unique_id");
      // localStorage.removeItem("patientDetails");

      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const uniqueId = localStorage.getItem("unique_id");
  const isLoggedIn = !!uniqueId;

  const patientDetails = localStorage.getItem("patientDetails");

  // Removed handlePatientDetailsClick function since it's no longer needed

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setIsEnglish(lng === "en");
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
    <div className="absolute z-30 flex flex-col md:flex-row items-center justify-between w-full bg-white px-3 py-2 md:px-5 md:py-3 roboto font-[600] text-[14px] md:text-[16px] border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-start">
        <NavLink to="/">
          <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741104055/image_2025_03_04T15_57_39_367Z_ybfvoe.png"
            className="h-8 md:h-10 md:pl-5"
            alt="Logo"
          />
        </NavLink>
        <button className="md:hidden text-2xl p-2" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Navigation Tabs and Mobile Menu */}
      <div
        ref={menuRef}
        className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto mt-2 md:mt-0 ${isMobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Home" ? "bg-[#81db58] text-white" : "bg-transparent text-black"}`
          }
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          {t("Home")}
        </NavLink>
        <NavLink
          to="/disclaimer"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Disclaimer" ? "bg-[#81db58] text-white" : "bg-transparent text-black"}`
          }
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          {t("Disclaimer")}
        </NavLink>
        <NavLink
          to="/patientDetails"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Patient Details" ? "bg-[#81db58] text-white" : "bg-transparent text-black"} `
          }
        >
          {t("Patient Details")}
        </NavLink>

        <button onClick={openAboutUsModal} className="w-full md:w-auto">
          <h1 className="text-[14px] md:text-[16px] font-[600] bg-[#C6D7BA] px-3 md:px-5 py-1 md:py-2 rounded-md border border-gray-400 text-center">
            {t("About us")}
          </h1>
        </button>

        {/* Login/Logout and Language Toggle in Mobile Menu */}
        <div className="flex flex-col space-y-2 w-full md:hidden">
          <button
            className="text-md font-semibold bg-[#81db58] rounded-md px-4 py-2 cursor-pointer w-full text-center text-white"
            onClick={isLoggedIn ? handleLogout : handleLogin}
          >
            {isLoggedIn ? t("logout") : t("login")}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-between border border-gray-300 rounded-full px-2 py-1 ml-20 w-[200px] h-[36px] relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
            aria-label={`Switch to ${isEnglish ? "Arabic" : "English"} language`}
          >
            <span
              className={`z-10 transition-all duration-300 text-xs font-medium ${!isEnglish ? "text-white pl-2" : "text-gray-600"}`}
            >
              عربي
            </span>
            <motion.div
              className="absolute top-1 h-[28px] rounded-full z-0 bg-[#81db58]"
              animate={{
                left: isEnglish ? "calc(50% - 2px)" : "2px",
                right: isEnglish ? "2px" : "calc(50% - 2px)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <span
              className={`z-10 transition-all duration-300 text-xs font-medium ${isEnglish ? "text-white mr-1" : "text-gray-600"}`}
            >
              English
            </span>
          </button>
        </div>
      </div>

      {/* Language Toggle and Login/Logout for Desktop */}
      <div className="hidden md:flex space-x-3 mt-2 md:mt-0">
        
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-between border border-gray-300 rounded-full px-2 py-1 w-[140px] h-[40px] relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
          aria-label={`Switch to ${isEnglish ? "Arabic" : "English"} language`}
        >
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${!isEnglish ? "text-white pl-3" : "text-gray-600"}`}
          >
            عربي
          </span>
          <motion.div
            className="absolute top-1 h-[32px] rounded-full z-0 bg-[#81db58]"
            animate={{
              left: isEnglish ? "calc(50% - 2px)" : "2px",
              right: isEnglish ? "2px" : "calc(50% - 2px)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${isEnglish ? "text-white mr-1" : "text-gray-600"}`}
          >
            English
          </span>
        </button>
        <button
          className="text-md font-semibold bg-[#81db58] rounded-md px-4 py-2 cursor-pointer text-white"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? t("logout") : t("login")}
        </button>
      </div>

      {/* About Us Modal */}
      {isAboutUsModalOpen && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50 px-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <motion.div
            className="w-full max-w-[90vw] md:w-[690px] h-auto max-h-[90vh] text-start bg-white flex flex-col justify-start items-center border border-gray-200 rounded-2xl shadow-lg relative overflow-y-auto p-4 md:p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex items-center text-[18px] md:text-[22px] font-[600] text-gray-700 absolute top-4 ${i18n.language === "ar" ? "right-4 md:right-6 text-right" : "left-4 md:left-6 text-left"} cursor-pointer`}
              onClick={closeAboutUsModal}
            >
              <IoIosArrowRoundBack
                className={`text-[28px] md:text-[32px] ml-1 ${i18n.language === "ar" ? "rotate-180" : ""}`}
              />
              <h1 className={`text-lg md:text-xl ${i18n.language === "ar" ? "mr-4" : "ml-2"}`}>{t("Back")}</h1>
            </div>
            <div className="max-w-2xl mx-auto p-6 rounded-lg mt-10" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-4">
                {t("e_clinic_title")}
              </h1>
              <p className="text-base md:text-md text-gray-800 text-justify mb-4">{t("e_clinic_intro")}</p>
              <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-3">{t("e_clinic_reason")}</h2>
              <div className="space-y-2 text-gray-700 text-base md:text-md list-disc list-inside">
                <h1>{t("service_medications")}</h1>
                <h1>{t("service_diagnosis")}</h1>
                <h1>{t("service_reports")}</h1>
                <h1>{t("service_tests")}</h1>
              </div>
              <p className="mt-4 text-gray-600 text-sm md:text-base">{t("disclaimer_note")}</p>
              <h3 className="mt-6 text-lg md:text-xl font-semibold text-blue-500 text-center">{t("contact_us")}</h3>
              <p className="text-center text-gray-800 text-base md:text-md">{t("For_question")}</p>
              <p className="text-center text-blue-600 font-semibold text-base md:text-md">
                📩 info@e-clinic.ai
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;