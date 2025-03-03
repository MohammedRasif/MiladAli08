// import i18n from "i18next";

// import { initReactI18next } from "react-i18next";

// const resources = {
//   en: {
//     translation: {
//       "E-Hospital": "E-Hospital",
//       "Home": "Home",
//       "Disclaimer": "Disclaimer",
//       "Patient Details": "Patient Details",
//       "English": "English",
//       "العربية": "Arabic",
//       "About us": "About us",
//       "Back": "Back",
//       "About us content goes here.": "About us content goes here.",
//       "Hi": "Hi",
//       "I’m your AI agent from": "I’m your AI agent from",
//       "Ask me anything about your health issues": "Ask me anything that you want to know about your health issues",
//       "This is an AI-based health support system. Please consult your doctor for medical advice.":
//         "This is an AI-based health support system. Please consult your doctor for medical advice.",
//       "Got It": "Got It",
//       "Hi, {{name}}!!": "Hi, {{name}}!!",
//       "How can I help you today?": "How can I help you today?",
//       "Loading...": "Loading...",
//       "Failed to get a response from the AI. Please try again.":
//         "Failed to get a response from the AI. Please try again.",
//       "Ask me anything about health issues": "Ask me anything about health issues",
//       "Please provide patient details to start chatting": "Please provide patient details to start chatting",
//       "Please provide patient details to enable chat.": "Please provide patient details to enable chat.",
//       "Upload File": "Upload File",
//       "Back": "Back",
//       "Patient Details": "Patient Details",
//       "Name": "Name",
//       "Height": "Height",
//       "Weight": "Weight",
//       "Gender": "Gender",
//       "Blood Group": "Blood Group",
//       "Age": "Age",
//       "Medical History (Optional)": "Medical History (Optional)",
//       "Enter here": "Enter here",
//       "Type here": "Type here",
//       "Submit": "Submit",
//       "Patient details saved successfully!": "Patient details saved successfully!",
//       "An error occurred while saving patient details. Please try again.":
//         "An error occurred while saving patient details. Please try again.",
//     },
//   },
//   ar: {
//     translation: {
//       "E-Hospital": "مستشفى إلكتروني",
//       "Home": "الرئيسية",
//       "Disclaimer": "إخلاء المسؤولية",
//       "Patient Details": "تفاصيل المريض",
//       "English": "الإنجليزية",
//       "العربية": "العربية",
//       "About us": "معلومات عنا",
//       "Back": "رجوع",
//       "About us content goes here.": "محتوى معلومات عنا يذهب هنا.",
//       "Hi": "مرحبًا",
//       "I’m your AI agent from": "أنا وكيلك الذكي من",
//       "Ask me anything about your health issues": "اسألني أي شيء تريد معرفته عن مشاكلك الصحية",
//       "This is an AI-based health support system. Please consult your doctor for medical advice.":
//         "هذا نظام دعم صحي قائم على الذكاء الاصطناعي. يرجى استشارة طبيبك للحصول على نصيحة طبية.",
//       "Got It": "فهمت",
//       "Hi, {{name}}!!": "مرحبًا، {{name}}!!",
//       "How can I help you today?": "كيف يمكنني مساعدتك اليوم؟",
//       "Loading...": "جارٍ التحميل...",
//       "Failed to get a response from the AI. Please try again.":
//         "فشل في الحصول على رد من الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.",
//       "Ask me anything about health issues": "اسألني أي شيء عن المشاكل الصحية",
//       "Please provide patient details to start chatting": "يرجى تقديم تفاصيل المريض لبدء الدردشة",
//       "Please provide patient details to enable chat.": "يرجى تقديم تفاصيل المريض لتفعيل الدردشة",
//       "Upload File": "رفع ملف",
//       "Back": "رجوع",
//       "Patient Details": "تفاصيل المريض",
//       "Name": "الاسم",
//       "Height": "الطول",
//       "Weight": "الوزن",
//       "Gender": "الجنس",
//       "Blood Group": "فصيلة الدم",
//       "Age": "العمر",
//       "Medical History (Optional)": "التاريخ الطبي (اختياري)",
//       "Enter here": "أدخل هنا",
//       "Type here": "اكتب هنا",
//       "Submit": "إرسال",
//       "Patient details saved successfully!": "تم حفظ تفاصيل المريض بنجاح!",
//       "An error occurred while saving patient details. Please try again.":
//         "حدث خطأ أثناء حفظ تفاصيل المريض. يرجى المحاولة مرة أخرى.",
//     },
//   },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "en", // Default language
//   interpolation: {
//     escapeValue: false, // React already escapes by default
//   },
// });

// export default i18n;











import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translations
const resources = {
  en: {
    translation: {
      "E-Hospital": "E-Hospital",
      "Home": "Home",
      "Disclaimer": "Disclaimer",
      "Patient Details": "Patient Details",
      "English": "English",
      "العربية": "Arabic",
      "About us": "About us",
      "Back": "Back",
      "About us content goes here.": "About us content goes here.",
      "Hi": "Hi",
      "I’m your AI agent from": "I’m your AI agent from",
      "Ask me anything about your health issues": "Ask me anything that you want to know about your health issues",
      "This is an AI-based health support system. Please consult your doctor for medical advice.":
        "This is an AI-based health support system. Please consult your doctor for medical advice.",
      "Got It": "Got It",
      "Hi, {{name}}!!": "Hi, {{name}}!!",
      "How can I help you today?": "How can I help you today?",
      "Loading...": "Loading...",
      "Failed to get a response from the AI. Please try again.":
        "Failed to get a response from the AI. Please try again.",
      "Ask me anything about health issues": "Ask me anything about health issues",
      "Please provide patient details to start chatting": "Please provide patient details to start chatting",
      "Please provide patient details to enable chat.": "Please provide patient details to enable chat.",
      "Upload File": "Upload File",
      "Name": "Name",
      "Height": "Height",
      "Weight": "Weight",
      "Gender": "Gender",
      "Blood Group": "Blood Group",
      "Age": "Age",
      "Diabetes": "Diabetes",
      "High blood pressure": "High blood pressure",
      "Medical History (Optional)": "Medical History (Optional)",
      "Enter here": "Enter here",
      "Type here": "Type here",
      "Submit": "Submit",
      "Patient details saved successfully!": "Patient details saved successfully!",
      "An error occurred while saving patient details. Please try again.":
        "An error occurred while saving patient details. Please try again.",
    },
  },
  ar: {
    translation: {
      "E-Hospital": "مستشفى إلكتروني",
      "Home": "الرئيسية",
      "Disclaimer": "إخلاء المسؤولية",
      "Patient Details": "تفاصيل المريض",
      "English": "الإنجليزية",
      "العربية": "العربية",
      "About us": "معلومات عنا",
      "Back": "رجوع",
      "About us content goes here.": "محتوى معلومات عنا يذهب هنا.",
      "Hi": "مرحبًا",
      "I’m your AI agent from": "أنا وكيلك الذكي من",
      "Ask me anything about your health issues": "اسألني أي شيء تريد معرفته عن مشاكلك الصحية",
      "This is an AI-based health support system. Please consult your doctor for medical advice.":
        "هذا نظام دعم صحي قائم على الذكاء الاصطناعي. يرجى استشارة طبيبك للحصول على نصيحة طبية.",
      "Got It": "فهمت",
      "Hi, {{name}}!!": "مرحبًا، {{name}}!!",
      "How can I help you today?": "كيف يمكنني مساعدتك اليوم؟",
      "Loading...": "جارٍ التحميل...",
      "Failed to get a response from the AI. Please try again.":
        "فشل في الحصول على رد من الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.",
      "Ask me anything about health issues": "اسألني أي شيء عن المشاكل الصحية",
      "Please provide patient details to start chatting": "يرجى تقديم تفاصيل المريض لبدء الدردشة",
      "Please provide patient details to enable chat.": "يرجى تقديم تفاصيل المريض لتفعيل الدردشة",
      "Upload File": "رفع ملف",
      "Name": "الاسم",
      "Height": "الطول",
      "Weight": "الوزن",
      "Gender": "الجنس",
      "Blood Group": "فصيلة الدم",
      "Age": "العمر",
      "Diabetes": "السكري",
      "High blood pressure": "ضغط دم مرتفع",
      "Medical History (Optional)": "التاريخ الطبي (اختياري)",
      "Enter here": "أدخل هنا",
      "Type here": "اكتب هنا",
      "Submit": "إرسال",
      "Patient details saved successfully!": "تم حفظ تفاصيل المريض بنجاح!",
      "An error occurred while saving patient details. Please try again.":
        "حدث خطأ أثناء حفظ تفاصيل المريض. يرجى المحاولة مرة أخرى.",
    },
  },
};

// Get the saved language from localStorage, default to "en" if not found
const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Use the saved language instead of hardcoded "en"
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;