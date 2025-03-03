// import { useContext, useEffect, useState } from "react";

// import { NavLink, useLocation } from "react-router-dom"; // Import useLocation for route tracking
// import { motion } from "framer-motion"; // For modal animation
// import { IoIosArrowRoundBack } from "react-icons/io";
// import i18n from "../../i18n";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//     const location = useLocation(); // Hook to get the current route
//     const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false); // State for About us modal


//     const { t, i18n } = useTranslation();

//       const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//       };

//     // Determine the active tab based on the current route
//     const getActiveTab = () => {
//         switch (location.pathname) {
//             case "/":
//                 return "Home";
//             case "/disclaimer":
//                 return "Disclaimer";
//             case "/patientDetails":
//                 return "Patient Details";
//             default:
//                 return "Home";
//         }
//     };

//     const activeTab = getActiveTab(); // Get the active tab

//     const openAboutUsModal = () => {
//         setIsAboutUsModalOpen(true); // Open About us modal
//     };

//     const closeAboutUsModal = () => {
//         setIsAboutUsModalOpen(false); // Close About us modal
//     };

//     // Modal animation variants
//     const modalVariants = {
//         hidden: { opacity: 0, scale: 0.8 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 },
//         },
//         exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
//     };

//     return (
//         <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
//             {/* Logo Section */}
//             <div className="flex items-center space-x-2">
//                 <div className="bg-[#006400] w-8 h-8 rounded-full border-2 border-[#D9D9D9]"></div>
//                 <div>
//                     <h1 className="text-lg font-bold">E-Hospital</h1>
//                 </div>
//             </div>

//             {/* Navigation Tabs */}
//             <div className="flex items-center space-x-3">
//                 <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                         `cursor-pointer px-4 py-2 rounded-md transition-all ${
//                             activeTab === "Home" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//                         }`
//                     }
//                 >
//                    Home
//                 </NavLink>
//                 <NavLink
//                     to="/disclaimer"
//                     className={({ isActive }) =>
//                         `cursor-pointer px-4 py-2 rounded-md transition-all ${
//                             activeTab === "Disclaimer" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//                         }`
//                     }
//                 >
//                     Disclaimer
//                 </NavLink>
//                 <NavLink
//                     to="/patientDetails"
//                     className={({ isActive }) =>
//                         `cursor-pointer px-4 py-2 rounded-md transition-all ${
//                             activeTab === "Patient Details" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//                         }`
//                     }
//                 >
//                     Patient Details
//                 </NavLink>

//                 <header className="w-full max-w-4xl flex flex-col sm:flex-row sm:justify-between items-center mb-8 rtl:sm:flex-row-reverse">

//         <div className="space-x-2 rtl:space-x-reverse">
//           <button
//             onClick={() => changeLanguage("en")}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             English
//           </button>
//           <button
//             onClick={() => changeLanguage("ar")}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             العربية
//           </button>
//         </div>
//       </header>

//             </div>

//             {/* Right Section - About us Button */}
//             <button onClick={openAboutUsModal}>
//                 <h1 className="text-[16px] font-[600] bg-[#C6D7BA] px-5 py-2 rounded-md border border-gray-400">
//                     About us
//                 </h1>
//             </button>

//             {/* About us Modal */}
//             {isAboutUsModalOpen && (
//                 <motion.div
//                     className="fixed inset-0 flex justify-center items-center z-50"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ type: "spring", stiffness: 100, damping: 25 }}
//                 >
//                     <motion.div
//                         className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
//                         variants={modalVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                     >
//                         {/* Back Button */}
//                         <div
//                             className="flex items-center text-[18px] font-[500] text-gray-700 absolute top-5 left-5 cursor-pointer"
//                             onClick={closeAboutUsModal}
//                         >
//                             <IoIosArrowRoundBack className="text-[28px] mr-1" />
//                             <h1>Back</h1>
//                         </div>

//                         <img
//                             src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740756752/Objects_eszpyt.png"
//                             alt="Dedication"
//                         />
//                         <h1 className="text-[18px] font-[500] mt-2">
//                             About us content goes here.
//                         </h1>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default Navbar;




// import { useContext, useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useTranslation } from "react-i18next";
// import i18n from "../../i18n"; // Assuming this is your i18n config file

// const Navbar = () => {
//   const location = useLocation();
//   const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
//   const { t } = useTranslation();

//   // Update document direction based on language


//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng); // This changes the language globally
//   };

//   const getActiveTab = () => {
//     switch (location.pathname) {
//       case "/":
//         return "Home";
//       case "/disclaimer":
//         return "Disclaimer";
//       case "/patientDetails":
//         return "Patient Details";
//       default:
//         return "Home";
//     }
//   };

//   const activeTab = getActiveTab();

//   const openAboutUsModal = () => setIsAboutUsModalOpen(true);
//   const closeAboutUsModal = () => setIsAboutUsModalOpen(false);

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 },
//     },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
//   };

//   return (
//     <div className="absolute z-30 flex items-center justify-between w-full bg-white px-5 py-3 roboto font-[600] text-[16px] border-b border-gray-200">
//       {/* Logo Section */}
//       <div className="flex items-center space-x-2">
//         <div className="bg-[#006400] w-8 h-8 rounded-full border-2 border-[#D9D9D9]"></div>
//         <h1 className="text-lg font-bold">{t("E-Hospital")}</h1>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex items-center space-x-3">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `cursor-pointer px-4 py-2 rounded-md transition-all ${
//               activeTab === "Home" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//             }`
//           }
//         >
//           {t("Home")}
//         </NavLink>
//         <NavLink
//           to="/disclaimer"
//           className={({ isActive }) =>
//             `cursor-pointer px-4 py-2 rounded-md transition-all ${
//               activeTab === "Disclaimer" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//             }`
//           }
//         >
//           {t("Disclaimer")}
//         </NavLink>
//         <NavLink
//           to="/patientDetails"
//           className={({ isActive }) =>
//             `cursor-pointer px-4 py-2 rounded-md transition-all ${
//               activeTab === "Patient Details" ? "bg-[#006400] text-white" : "bg-transparent text-black"
//             }`
//           }
//         >
//           {t("Patient Details")}
//         </NavLink>

//         <button onClick={openAboutUsModal}>
//         <h1 className="text-[16px] font-[600] bg-[#C6D7BA] px-5 py-2 rounded-md border border-gray-400">
//           {t("About us")}
//         </h1>
//       </button>

//         {/* Language Buttons */}

//       </div>


//       <div className="space-x-2">
//           <button
//             onClick={() => changeLanguage("en")}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             {t("English")}
//           </button>
//           <button
//             onClick={() => changeLanguage("ar")}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             {t("العربية")}
//           </button>
//         </div>

//       {/* About Us Modal */}
//       {isAboutUsModalOpen && (
//         <motion.div
//           className="fixed inset-0 flex justify-center items-center z-50"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ type: "spring", stiffness: 100, damping: 25 }}
//         >
//           <motion.div
//             className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <div
//               className="flex items-center text-[18px] font-[500] text-gray-700 absolute top-5 left-5 cursor-pointer"
//               onClick={closeAboutUsModal}
//             >
//               <IoIosArrowRoundBack className="text-[28px] mr-1" />
//               <h1>{t("Back")}</h1>
//             </div>
//             <img
//               src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740756752/Objects_eszpyt.png"
//               alt="Dedication"
//             />
//             <h1 className="text-[18px] font-[500] mt-2">{t("About us content goes here.")}</h1>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


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
        <div className="bg-[#006400] w-8 h-8 rounded-full border-2 border-[#D9D9D9]"></div>
        <h1 className="text-lg font-bold">{t("E-Hospital")}</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-3 space-x-reverse">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Home" ? "bg-[#006400] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Home")}
        </NavLink>
        <NavLink
          to="/disclaimer"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Disclaimer" ? "bg-[#006400] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Disclaimer")}
        </NavLink>
        <NavLink
          to="/patientDetails"
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md transition-all ${activeTab === "Patient Details" ? "bg-[#006400] text-white" : "bg-transparent text-black"
            }`
          }
        >
          {t("Patient Details")}
        </NavLink>

        <button onClick={openAboutUsModal}>
          <h1 className="text-[16px] font-[600] bg-[#C6D7BA] px-5 py-2 rounded-md border border-gray-400">
            {t("About us")}
          </h1>
        </button>
      </div>

      {/* Language Toggle */}
      <div className="relative">
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-between border border-gray-300 rounded-full px-2 py-1 w-[140px] h-[40px] relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
          aria-label={`Switch to ${isEnglish ? "Arabic" : "English"} language`}
        >
          {/* Arabic option */}
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${!isEnglish ? "text-white" : "text-gray-600"
              }`}
          >
            عربي
          </span>

          {/* Toggle indicator */}
          <motion.div
            className="absolute top-1 h-[32px] rounded-full z-0 bg-green-600"
            animate={{
              left: isEnglish ? "calc(50% - 2px)" : "2px",
              right: isEnglish ? "2px" : "calc(50% - 2px)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* English option */}
          <span
            className={`z-10 transition-all duration-300 text-sm font-medium ${isEnglish ? "text-white" : "text-gray-600"
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
            className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex items-center text-[18px] font-[500] text-gray-700 absolute top-5 ${i18n.language === "ar" ? "right-5" : "left-5"
                } cursor-pointer`}
              onClick={closeAboutUsModal}
            >
              <IoIosArrowRoundBack
                className={`text-[28px] ${i18n.language === "ar" ? "ml-1 transform rotate-180" : "mr-1"
                  }`}
              />
              <h1>{t("Back")}</h1>
            </div>
            <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740756752/Objects_eszpyt.png"
              alt="Dedication"
            />
            <h1 className="text-[18px] font-[500] mt-2">{t("About us content goes here.")}</h1>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;

