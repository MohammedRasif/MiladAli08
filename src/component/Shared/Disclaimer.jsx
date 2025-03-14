import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { LuTriangleAlert } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Assuming this is your i18n config file

const Disclaimer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        className="w-[90vw] max-w-[800px] h-auto max-h-[90vh] bg-white flex flex-col justify-start items-center border border-gray-200 rounded-2xl shadow-lg relative overflow-y-auto p-4 md:p-6"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className={`flex items-center text-[18px] md:text-[22px] font-[600] text-gray-700 absolute top-4 ${i18n.language === "ar" ? "right-4 md:right-6 text-right" : "left-4 md:left-6 text-left"} cursor-pointer`}
          onClick={closeModal}
        >
          <IoIosArrowRoundBack
            className={`text-[28px] md:text-[32px] ml-1 ${i18n.language === "ar" ? "rotate-180 mt-2" : ""}`}
          />
          <h1 className={`text-lg md:text-xl ${i18n.language === "ar" ? "mr-4" : "ml-2"}`}>
            {t("Back")}
          </h1>
        </div>


        <div
          className={`w-full max-w-[690px] px-6 md:px-10 py-6 md:py-8 flex flex-col justify-start items-center rounded-2xl ${i18n.language === "ar" ? "text-right" : "text-left"}`}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <LuTriangleAlert className="text-5xl md:text-6xl font-[500] text-red-700 mb-3 md:mb-4" />

          {/* Terms List */}
          <div className="text-[12px] md:text-[14px] lg:text-[16px] font-[500] px-2 space-y-2">
            <p>{t("Welcome_to_out")}</p>

            <h3 className="font-bold text-base">{t("Medical_Disclaimer")}</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("health assistant 0")}</li>
              <li>{t("health assistant 1")}</li>
              <li>{t("health assistant 2")}</li>
              <li>{t("health assistant 3")}</li>
              <li>{t("health assistant 4")}</li>
            </ul>

            <h3 className="font-bold text-base">{t("Data privacy")}</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("health assistant 5")}</li>
              <li>{t("health assistant 6")}</li>
              <li>{t("health assistant 7")}</li>
            </ul>

            <h3 className="font-bold text-base">{t("Acceptance of terms")}</h3>
            <div className="space-y-1">
              <p>{t("by useing this service")}</p>
            </div>
          </div>

          {/* Got It Button */}
          <NavLink to="/">
            <button className="text-white bg-green-500 rounded-md px-3 md:px-4 py-1 md:py-2 mt-3 md:mt-4 text-xs md:text-sm">
              {t("Got It")}
            </button>
          </NavLink>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Disclaimer;
