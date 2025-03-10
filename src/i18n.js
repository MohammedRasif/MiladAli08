import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translations
const resources = {
  en: {
    translation: {
      "E-Hospital": "E-Clinic",
      "Home": "Home",
      "Disclaimer": "Disclaimer",
      "Patient Details": "Patient Details",
      "English": "English",
      "العربية": "Arabic",
      "About us": "About us",
      "Back": "Back",
      "About us content goes here.": "About us content goes here.",
      "Hi": "Hi",
      "I’m your AI agent from": "A smarter way to check your symptoms, powered by ",
      "Ask me anything about your health issues": "Share your symptoms, and I’ll help you understand them better.",
      "This is an AI-based health support system. Please consult your doctor for medical advice.":
        "This system provides general guidance only, for specific medical inquiries please consult a specialist.",
      "Got It": "Agreed",
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
      "Sex": "Sex",
      "Select Sex": "Select Sex",
      "Yes": "Yes",
      "Allergies or Family History": "(Optional) Allergies or Family History",
      "No": "No",
      "Male": "Male",
      "Female": "Female",
      "Select": "Select",
      "Diabetes": "Do you have Diabetes?",
      "Select Diabetes": "Select Diabetes",
      "High Blood Pressure": "Do you have Blood Pressure?",
      "Select Pressure": "Select Pressure",
      "Medical History (Optional)": "Medical History (Optional)",
      "Enter here": "Enter here",
      "Type here": "Type here",
      "Submit": "Submit",


      "Important Notice: E-Clinic Terms of Use": "Important Notice: E-Clinic Terms of Use",
      "health assistant 0": "This AI-powered health assistant is not a licensed medical professional and does not provide official medical diagnoses or treatments.",
      "health assistant 1": "The information provided is based on AI analysis of symptoms and general medical knowledge and should be used for informational purposes only.",
      "health assistant 2": "Always consult a qualified doctor or healthcare provider for a proper diagnosis and treatment plan.",
      "health assistant 3": "If you experience severe, worsening, or emergency symptoms, seek immediate medical attention or visit the nearest hospital.",
      "health assistant 4": "By using this service, you acknowledge that you understand these terms and accept that the AI does not replace professional medical advice.",




    
        "e_clinic_title": "E-Clinic – Your Doctor at Hand!",
        "e_clinic_intro": "Welcome to E-Clinic, your AI-powered health assistant designed to be your virtual doctor, providing instant medical guidance anytime, anywhere.",
        "e_clinic_reason": "Why did we create E-Clinic? Because healthcare is a right for everyone! Our goal is to help people who cannot afford doctors or live in areas with limited medical services. With AI-powered diagnostics, we can assist you in understanding your symptoms and making informed health decisions.",
        "services_title": "What services does E-Clinic offer?",
        "service_diagnosis": "Disease diagnosis – Enter your symptoms and receive an instant medical analysis.",
        "service_reports": "Medical report reading – Upload your test results and get an accurate medical interpretation.",
        "service_tests": "Test and examination suggestions – Get recommendations for lab tests, X-rays, CT scans, and MRIs to better understand your health.",
        "service_medications": "Appropriate medication suggestions – Receive recommendations for suitable medications, including generic names and available brands in your country, with proper usage instructions.",
        "disclaimer_note": "This service is for informational purposes only and does not replace professional medical advice.",
        "contact_us": "Contact us for any inquiries",
        "prayer_message": "May Allah grant mercy and forgiveness to all deceased Muslims and bless everyone with good health.",
  
      


      "health assistant": "This AI-powered health assistant is not a licensed medical professional and does not provide official medical diagnoses or treatments. The information provided is based on AI analysis of symptoms and general medical knowledge and should be used for informational purposes only. Always consult a qualified doctor or healthcare provider for a proper diagnosis and treatment plan. If you experience severe, worsening, or emergency symptoms, seek immediate medical attention or visit the nearest hospital. By using this service, you acknowledge that you understand these terms and accept that the AI does not replace professional medical advice.",
      "Patient details saved successfully!": "Patient details saved successfully!",
      "An error occurred while saving patient details. Please try again.":
        "An error occurred while saving patient details. Please try again.",
      "Reported Symptoms": "What are you Symptoms(Tell me how are you feeling)?",
      "List of Medications (if any)": "Name of Medications (if any)",
      "Country": "Country",
      "Health Conditions (if any)": "Health Conditions (if any)",
      "Are They Taking Any Medications?": "Are You Taking Any Medications?",
      // New keys for the provided content
      "welcome_title": "Welcome to the E-Clinic",
      "welcome_description": "Your AI-powered online health assistant designed to provide accessible medical guidance for people worldwide.",
      "platform_purpose": "This platform was created to help those in need—people who cannot afford proper medical care or live in regions with weak healthcare systems. By providing AI-powered consultations, we aim to offer clarity, guidance, and better understanding of medical conditions, so users can make more informed health decisions.",
      "what_we_offer": "What We Offer:",
      "symptom_checker": "AI Symptom Checker – Get a possible explanation for your symptoms.",
      "report_analysis": "Medical Report Analysis – Upload test results for AI-powered insights.",
      "health_assistant_24_7": "24/7 Health Assistant – Instant answers anytime, anywhere.",
      "disclaimer_note": "Our AI health assistance helps users better understand their symptoms, but it is NOT a replacement for a licensed doctor.",
      "contact_us": "For questions or inquiries, contact us at:",
      "contact_email": "info@e-clinic.ai",
    },
  },
  ar: {
    translation: {
      "E-Hospital": "العيادة الإلكترونية",
      "Home": "الرئيسية",
      "Disclaimer": "إخلاء المسؤولية",
      "Patient Details": "تفاصيل المريض",
      "English": "الإنجليزية",
      "العربية": "العربية",
      "About us": "معلومات عنا",
      "Back": "رجوع",
      "About us content goes here.": "محتوى معلومات عنا يذهب هنا.",
      "Hi": "مرحبًا بكم في",
      "I’m your AI agent from": "ذكاء اصطناعي يفهم حالتك الصحية وينصحك على العلاج المناسب بسهولة وسرعة",
      "Ask me anything about your health issues": "اسألني أي شيء تريد معرفته عن مشاكلك الصحية",
      "This is an AI-based health support system. Please consult your doctor for medical advice.":
        "المعلومات المقدمة هنا للإرشاد فقط، يُنصح بمراجعة طبيبك للحصول على استشارات موثوقة.",
      "Got It": "موافق",
      "Hi, {{name}}!!": "مرحبًا بكم في، {{name}}!!",
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
      "Sex": "الجنس",
      "Select Sex": "اختر الجنس",
      "Yes": "نعم",
      "No": "لا",
      "Male": "ذكر",
      "Female": "أنثى",
      "Select": "اختر",
      "Diabetes": "السكري",
      "Select Diabetes": "اختر السكري",
      "High Blood Pressure": "ضغط دم مرتفع",
      "Select Pressure": "اختر الضغط",
      "Medical History (Optional)": "التاريخ الطبي (اختياري)",
      "Allergies or Family History": "هل تعاني من أي حساسية أو يوجود امراض وراثية في العائلة",
      "Enter here": "أدخل هنا",
      "Type here": "اكتب هنا",
      "Submit": "إرسال",

      // "E-Hospital": "العيادة الإلكترونية",
      "Important Notice: E-Clinic Terms of Use": "تنبيه هام: شروط استخدام العيادة الإلكترونية",
      "health assistant 0": "هذا المساعد الصحي المدعوم بالذكاء الاصطناعي ليس طبيبًا مرخصًا ولا يقدم تشخيصات طبية رسمية أو علاجات.",
      "health assistant 1": "المعلومات المقدمة تعتمد على تحليل الذكاء الاصطناعي للأعراض والمعرفة الطبية العامة ويجب استخدامها لأغراض المعلومات فقط.",
      "health assistant 2": "استشر دائمًا طبيبًا مؤهلاً أو مقدم رعاية صحية للحصول على تشخيص وخطة علاج مناسبة.",
      "health assistant 3": "إذا كنت تعاني من أعراض شديدة أو متفاقمة أو طارئة، اطلب العناية الطبية الفورية أو قم بزيارة أقرب مستشفى.",
      "health assistant 4": "باستخدام هذه الخدمة، فإنك تقر بأنك تفهم هذه الشروط وتقبل أن الذكاء الاصطناعي لا يحل محل النصيحة الطبية المهنية.",
      // "Got It": "موافق",






        "e_clinic_title": "المشفى الإلكتروني – طبيبك بين يديك!",
        "e_clinic_intro": "مرحبًا بك في المشفى الإلكتروني، مساعدك الصحي المدعوم بالذكاء الاصطناعي، المصمم ليكون طبيبك الافتراضي ويوفر لك إرشادات طبية فورية في أي وقت وأي مكان.",
        "e_clinic_reason": "لماذا أنشأنا المشفى الإلكتروني؟ لأن الرعاية الصحية حق للجميع! هدفنا هو مساعدة الأشخاص الذين لا يستطيعون تحمل تكاليف الأطباء أو يعيشون في مناطق تعاني من نقص الخدمات الطبية. بفضل التشخيص الذكي، يمكننا مساعدتك على فهم أعراضك واتخاذ قرارات صحية أكثر وعيًا.",
        "services_title": "الخدمات التي نقدمها بالمشفى الالكتروني؟",
        "service_diagnosis": "تشخيص المرض – أدخل الأعراض واحصل على تحليل طبي فوري.",
        "service_reports": "قراءة التقارير الطبية – حمل نتائج فحوصاتك واحصل على تفسير طبي دقيق.",
        "service_tests": "اقتراح التحاليل الطبية والفحوصات – احصل على توصيات حول الفحوصات المخبرية أو صور الأشعة، CT scan و MRI لفهم حالتك الصحية بشكل أفضل.",
        "service_medications": "اقتراح الأدوية المناسبة – توصيات حول الأدوية الملائمة لحالتك الصحية، تشمل الاسم العائلي للدواء والأسماء التجارية المتوفرة في بلدك، مع تعليمات الاستخدام المناسبة.",
        "disclaimer_note": "هذه الخدمة هي لأغراض المعلومات فقط ولا تغني عن استشارة الطبيب المختص.",
        "contact_us": "تواصل معنا لأي استفسارات",
        "prayer_message": "نسأل الله الرحمة والمغفرة لجميع موتى المسلمين، وأن يمنّ بالصحة والعافية على الجميع",

      

      "health assistant": "هذا المساعد الصحي المدعوم بالذكاء الاصطناعي ليس طبيبًا مرخصًا ولا يقدم تشخيصات طبية رسمية أو علاجات. المعلومات المقدمة تعتمد على تحليل الذكاء الاصطناعي للأعراض والمعرفة الطبية العامة ويجب استخدامها لأغراض المعلومات فقط. استشر دائمًا طبيبًا مؤهلاً أو مقدم رعاية صحية للحصول على تشخيص وخطة علاج مناسبة. إذا كنت تعاني من أعراض شديدة أو متفاقمة أو طارئة، اطلب العناية الطبية الفورية أو قم بزيارة أقرب مستشفى. باستخدام هذه الخدمة، فإنك تقر بأنك تفهم هذه الشروط وتقبل أن الذكاء الاصطناعي لا يحل محل النصيحة الطبية المهنية.",
      "Patient details saved successfully!": "تم حفظ تفاصيل المريض بنجاح!",
      "An error occurred while saving patient details. Please try again.":
        "حدث خطأ أثناء حفظ تفاصيل المريض. يرجى المحاولة مرة أخرى.",
      "Reported Symptoms": "أدخل الأعراض الحالية التي تعاني منها",
      "List of Medications (if any)": "قائمة الأدوية (إن وجدت)",
      "Country": "الدولة",
      "Health Conditions (if any)": "مشاكل صحية إضافية؟",
      "Are They Taking Any Medications?": "هل تتناول أدوية يوميًا أو بانتظام؟",
      // New keys for the provided content
      "welcome_title": "مرحبًا بكم في العيادة الإلكترونية",
      "welcome_description": "مساعدك الصحي عبر الإنترنت المدعوم بالذكاء الاصطناعي، مصمم لتوفير إرشادات طبية متاحة للناس في جميع أنحاء العالم.",
      "platform_purpose": "تم إنشاء هذه المنصة لمساعدة المحتاجين—الأشخاص الذين لا يستطيعون تحمل تكاليف الرعاية الطبية المناسبة أو يعيشون في مناطق ذات أنظمة صحية ضعيفة. من خلال تقديم استشارات مدعومة بالذكاء الاصطناعي، نهدف إلى توفير الوضوح والإرشاد وفهم أفضل للحالات الطبية، حتى يتمكن المستخدمون من اتخاذ قرارات صحية أكثر وعيًا.",
      "what_we_offer": "ما نقدمه:",
      "symptom_checker": "فحص الأعراض بالذكاء الاصطناعي – احصل على تفسير محتمل لأعراضك.",
      "report_analysis": "تحليل التقارير الطبية – قم برفع نتائج الاختبارات للحصول على رؤى مدعومة بالذكاء الاصطناعي.",
      "health_assistant_24_7": "مساعد صحي على مدار الساعة – إجابات فورية في أي وقت وفي أي مكان.",
      "disclaimer_note": "مساعدتنا الصحية بالذكاء الاصطناعي تساعد المستخدمين على فهم أعراضهم بشكل أفضل، لكنها ليست بديلاً عن طبيب مرخص.",
      "contact_us": "للأسئلة أو الاستفسارات، تواصلوا معنا على:",
      "contact_email": "info@e-clinic.ai",
    },
  },
};

// Get the saved language from localStorage, default to "ar" if not found
const savedLanguage = localStorage.getItem("language") || "ar";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;