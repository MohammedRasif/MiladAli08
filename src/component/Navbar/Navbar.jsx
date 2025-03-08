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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    // Check localStorage for language, default to "ar" if not set
    const savedLanguage = localStorage.getItem("language");
    const initialLanguage = savedLanguage || "ar"; // Default to "ar" if no saved language

    i18n.changeLanguage(initialLanguage); // Set the initial language
    setIsEnglish(initialLanguage === "en"); // Update state based on language

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
        <img
          src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741104055/image_2025_03_04T15_57_39_367Z_ybfvoe.png"
          className="h-8 md:h-10 md:pl-5"
          alt="Logo"
        />
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-2xl p-2"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Navigation Tabs */}
      <div
        className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto mt-2 md:mt-0 ${isMobileMenuOpen ? "block" : "hidden md:flex"
          }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Home" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          {t("Home")}
        </NavLink>
        <NavLink
          to="/disclaimer"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Disclaimer" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          {t("Disclaimer")}
        </NavLink>
        <NavLink
          to="/patientDetails"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-all w-full md:w-auto text-center ${activeTab === "Patient Details" ? "bg-[#81db58] text-white" : "bg-transparent text-black"
            }`
          }
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          {t("Patient Details")}
        </NavLink>

        <button onClick={openAboutUsModal} className="w-full md:w-auto">
          <h1 className="text-[14px] md:text-[16px] font-[600] bg-[#C6D7BA] px-3 md:px-5 py-1 md:py-2 rounded-md border border-gray-400">
            {t("About us")}
          </h1>
        </button>
      </div>

      {/* Language Toggle */}
      <div className="md:mt-0 lg:mt-2 mt-2 z-40"> {/* Removed -mt-10, added z-40 */}
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-between border border-gray-300 rounded-full px-2 py-1 w-[120px] md:w-[140px] h-[36px] md:h-[40px] relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
          aria-label={`Switch to ${isEnglish ? "Arabic" : "English"} language`}
        >
          <span
            className={`z-10 transition-all duration-300 text-xs md:text-sm font-medium ${!isEnglish ? "text-white pl-2 md:pl-3" : "text-gray-600"
              }`}
          >
            عربي
          </span>
          <motion.div
            className="absolute top-1 h-[28px] md:h-[32px] rounded-full z-0 bg-[#81db58]"
            animate={{
              left: isEnglish ? "calc(50% - 2px)" : "2px",
              right: isEnglish ? "2px" : "calc(50% - 2px)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <span
            className={`z-10 transition-all duration-300 text-xs md:text-sm font-medium ${isEnglish ? "text-white mr-1" : "text-gray-600"
              }`}
          >
            English
          </span>
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
            className="w-full max-w-[90vw] md:w-[690px] h-auto max-h-[90vh] text-center bg-white flex flex-col justify-start items-center border border-gray-200 rounded-2xl shadow-lg relative overflow-y-auto p-4 md:p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="flex items-center text-[16px] md:text-[18px] font-[500] text-gray-700 absolute top-4 left-4 md:left-5 cursor-pointer"
              onClick={closeAboutUsModal}
            >
              <IoIosArrowRoundBack className="text-[24px] md:text-[28px] mr-1" />
              <h1>{t("Back")}</h1>
            </div>
            <div className="max-w-full mx-auto p-4 md:p-6 bg-white rounded-lg mt-10">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600 text-center">
                المشفى الإلكتروني – طبيبك بين يديك!
              </h1>
              <p className="mt-3 text-base md:text-lg text-center">
                مرحبًا بك في المشفى الإلكتروني، مساعدك الصحي المدعوم بالذكاء الاصطناعي، المصمم ليكون طبيبك الافتراضي ويوفر لك إرشادات طبية فورية في أي وقت وأي مكان.
              </p>

              <p className="mt-3 text-sm md:text-base text-gray-700">
                لماذا أنشأنا المشفى الإلكتروني؟ لأن الرعاية الصحية حق للجميع! هدفنا هو مساعدة الأشخاص الذين لا يستطيعون تحمل تكاليف الأطباء أو يعيشون في مناطق تعاني من نقص الخدمات الطبية. بفضل التشخيص الذكي، يمكننا مساعدتك على فهم أعراضك واتخاذ قرارات صحية أكثر وعيًا.
              </p>

              <div className="mt-4 md:mt-6">
                <h2 className="text-lg md:text-xl font-semibold text-blue-500">
                  الخدمات التي نقدمها بالمشفى الالكتروني؟
                </h2>
                <ul className="mt-2 space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-center">
                    <span className="text-green-500 text-lg md:text-xl mr-2">✅</span>
                    تشخيص المرض – أدخل الأعراض واحصل على تحليل طبي فوري.
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 text-lg md:text-xl mr-2">✅</span>
                    قراءة التقارير الطبية – حمل نتائج فحوصاتك واحصل على تفسير طبي دقيق.
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 text-lg md:text-xl mr-2">✅</span>
                    اقتراح التحاليل الطبية والفحوصات – احصل على توصيات حول الفحوصات المخبرية أو صور الأشعة، CT scan و MRI لفهم حالتك الصحية بشكل أفضل.
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 text-lg md:text-xl mr-2">✅</span>
                    اقتراح الأدوية المناسبة – توصيات حول الأدوية الملائمة لحالتك الصحية، تشمل الاسم العائلي للدواء والأسماء التجارية المتوفرة في بلدك، مع تعليمات الاستخدام المناسبة.
                  </li>
                </ul>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-100 border-l-4 border-yellow-500">
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  ⚠️ {t("disclaimer_note")}
                </p>
              </div>

              <p className="mt-4 md:mt-6 text-center text-gray-700 text-sm md:text-base">
                تواصل معنا لأي استفسارات
              </p>
              <p className="text-center text-blue-600 font-semibold text-sm md:text-base">
                📩 info@e-clinic.ai
              </p>

              <p className="mt-4 md:mt-6 text-center text-gray-700 text-sm md:text-base">
                نسأل الله الرحمة والمغفرة لجميع موتى المسلمين، وأن يمنّ بالصحة والعافية على الجميع
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;