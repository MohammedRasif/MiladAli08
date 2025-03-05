// import { useEffect } from "react";

// import { motion } from "framer-motion"; // For modal animation
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { NavLink, useNavigate } from "react-router-dom"; // For navigation
// import { LuTriangleAlert } from "react-icons/lu";

// const Disclaimer = () => {
//     const navigate = useNavigate(); // Hook for navigation

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

//     // Close modal and navigate back to Home
//     const closeModal = () => {
//         navigate("/"); // Navigate back to Home
//     };

//     // Automatically trigger modal animation when the component mounts
//     useEffect(() => {
//         // You can add any additional logic here if needed
//     }, []);

//     return (
//         <motion.div
//         className="fixed inset-0 flex justify-center items-center z-50"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ type: "spring", stiffness: 100, damping: 25 }}
//         >
//             <motion.div
//                 className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg relative"
//                 variants={modalVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//             >
                

//                 <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
//                     {/* Back Button */}
//                 <div
//                     className="flex items-center text-[18px] font-[500] text-gray-700 absolute top-5 left-5 cursor-pointer"
//                     onClick={closeModal}
//                 >
//                     <IoIosArrowRoundBack className="text-[28px] mr-1" />
//                     <h1>Back</h1>
//                 </div>
//                                 <div className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
//                                     <LuTriangleAlert className="text-7xl font-[500] text-red-700 mb-5" />
//                                     <h1 className="text-[18px] font-[500]">
//                                         This is an AI-based health support system. <br /> Please consult your doctor for medical advice.
//                                     </h1>
//                                     <NavLink to="/">
//                                         <button className="text-white bg-[#006400] rounded-md px-4 mt-5">Got It</button>
//                                     </NavLink>
//                                 </div>
//                             </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default Disclaimer;





import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { LuTriangleAlert } from "react-icons/lu";
import { Trans, useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Assuming this is your i18n config file

const Disclaimer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Update document direction based on language
 

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Close modal and navigate back to Home
  const closeModal = () => {
    navigate("/"); // Navigate back to Home
  };

  return (
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
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
          {/* Back Button */}
          <div
            className={`flex items-center text-[18px] font-[500] text-gray-700 absolute -top-10 ${
              i18n.language === "ar" ? "left-5 mt-5" : "left-5"
            } cursor-pointer`}
            onClick={closeModal}
          >
            <IoIosArrowRoundBack
              className={`text-[28px] ${i18n.language === "ar" ? "ml-1 transform rotate-180" : "mr-1"}`}
            />
            <h1>{t("Back")}</h1>
          </div>
          <div className="w-[690px] px-10 py-10 text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
      <LuTriangleAlert className="text-7xl font-[500] text-red-700 mb-5" />
      <h1 className="text-[18px] font-[500]">
        <Trans i18nKey="health assistant" />
      </h1>
      <NavLink to="/">
        <button className="text-white bg-green-500 rounded-md px-4 mt-5">
          {t("Got It")}
        </button>
      </NavLink>
    </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Disclaimer;