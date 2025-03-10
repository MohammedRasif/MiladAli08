
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
        className="w-[690px] h-[324px] text-center  flex flex-col justify-center items-center rounded-2xl shadow-lg relative"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 p-4">
          {/* Back Button */}
          <div
            className={`flex items-center text-[16px] md:text-[18px] font-[500] text-gray-700 absolute -top-16 md:-top-20 lg:-mt-0 md:-mt-0 -mt-7 ${i18n.language === "ar" ? "left-5 mt-5" : "left-5"
              } cursor-pointer`}
            onClick={closeModal}
          >
            <IoIosArrowRoundBack
              className={`text-[24px] md:text-[28px] ${i18n.language === "ar" ? "ml-1 transform mt-1" : "mr-1"}`}
            />
            <h1>{t("Back")}</h1>
          </div>

          {/* Modal Content */}
          <div className="w-full max-w-[690px] px-6 md:px-10 py-6 md:py-10 text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
            <LuTriangleAlert className="text-6xl md:text-7xl font-[500] text-red-700 mb-4 md:mb-5" />

            {/* Terms List */}
            <ul className="text-[14px] md:text-[16px] lg:text-[18px] font-[500] px-2 text-left list-disc list-inside">
              {[
                t("health assistant 0"),
                t("health assistant 1"),
                t("health assistant 2"),
                t("health assistant 3"),
                t("health assistant 4"),
              ].map((item, index) => (
                <li key={index} className="text-[14px] md:text-[16px] lg:text-[18px] font-[500] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            {/* Got It Button */}
            <NavLink to="/">
              <button className="text-white bg-green-500 rounded-md px-3 md:px-4 py-1 md:py-2 mt-4 md:mt-5 text-sm md:text-base">
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