import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translations
const resources = {
  en: {
    translation: {
      "E-Hospital": "E-Clinic",
      "Home": "Home",
      "Disclaimer": "Terms of use",
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
      "Welcome_to_out": "Welcome to our AI-powered health assistant. By using this service, you agree to the following terms:",
      "Medical_Disclaimer": "Medical Disclaimer",

      "health assistant 0": "This AI-powered health assistant is not a licensed medical professional and does not provide official medical diagnoses or treatments.",

      "health assistant 1": "The information provided is based on AI analysis of symptoms and general medical knowledge and is for informational purposes only.",

      "health assistant 2": "Always consult a qualified doctor or healthcare provider for an official diagnosis and treatment plan.",

      "health assistant 3": "If you experience severe, worsening, or emergency symptoms, seek immediate medical attention or visit the nearest hospital.",

      "health assistant 4": "Neither the website, its owner, nor the technology used is responsible for any medical mistakes, misdiagnoses, or incorrect health assessments.",

      "Data privacy": "Data Privacy & Storage",

      "health assistant 5": "We temporarily store your conversation history to help improve our AI responses. This data is not linked to any personal identity.",

      "health assistant 6": "All interactions are securely processed through OpenAI’s API.",
      "health assistant 7": "We do not share or sell your data to third parties.",
      "Acceptance of terms": "Acceptance of Terms",
      "by useing this service": "By using this service, you acknowledge that you have read, understood, and agreed to these Terms of Use. If you do not agree with any part of these terms, please refrain from using our service.",






      "e_clinic_title": "About Us – The E-Clinic",
      "e_clinic_intro": "At The E-Clinic, we believe everyone deserves quality healthcare. We understand that high costs, a shortage of nearby doctors, and underdeveloped healthcare systems can limit access to proper care. That’s why we offer free, AI-driven health consultations to improve your medical awareness and help you make informed decisions.",

      "e_clinic_reason": "What We Offer",

      // "services_title": "✅ AI Symptom Checker: Receive possible explanations for your symptoms using advanced AI analysis.",
      "service_diagnosis": "✅ Medical Report Analysis: Upload your test results for AI-powered insights into your health.",
      "service_reports": "✅ 24/7 Health Assistant: Get instant answers to your health questions anytime, anywhere.",

      "service_tests": "✅ Medical Test Recommendations: Get personalized advice on necessary tests—whether it's an MRI, CT scan, or X-ray.",
      "service_medications": "✅ AI Symptom Checker: Receive possible explanations for your symptoms using advanced AI analysis.",

      // "disclaimer_note": "Care Plan & Medication Guidance: Access tailored care plans and medication recommendations to support your health journey.",

      "contact_us": "Our Commitment",
      "prayer_message": "🚨 Our AI health assistant provides helpful information but is not a substitute for professional medical advice. Always consult a licensed doctor for a proper diagnosis and treatment.",

      "Get_in": "Get in Touch",
      "For_question": "For questions or further inquiries, please contact us at:",
      "Email": "📩 info@e-clinic.ai",








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


      "Important Notice: E-Clinic Terms of Use": "تنبيه هام: شروط استخدام العيادة الإلكترونية",
      "Welcome_to_out": "مرحبًا بك في مساعدنا الصحي المدعوم بالذكاء الاصطناعي. باستخدامك لهذه الخدمة، فإنك توافق على الشروط التالية:",
      "Medical_Disclaimer": "إخلاء المسؤولية الطبية",

      "health assistant 0": "هذا المساعد الصحي المدعوم بالذكاء الاصطناعي ليس طبيبًا مرخصًا ولا يقدم تشخيصات طبية رسمية أو علاجات.",

      "health assistant 1": "المعلومات المقدمة تعتمد على تحليل الذكاء الاصطناعي للأعراض والمعرفة الطبية العامة ويجب استخدامها لأغراض المعلومات فقط.",

      "health assistant 2": "استشر دائمًا طبيبًا مؤهلاً أو مقدم رعاية صحية للحصول على تشخيص وخطة علاج مناسبة.",

      "health assistant 3": "إذا كنت تعاني من أعراض شديدة أو متفاقمة أو طارئة، اطلب العناية الطبية الفورية أو قم بزيارة أقرب مستشفى.",

      "health assistant 4": "لا تتحمل الموقع أو مالكه أو التقنية المستخدمة أي مسؤولية عن الأخطاء الطبية أو التشخيصات الخاطئة أو التقييمات الصحية غير الدقيقة.",

      "Data privacy": "خصوصية البيانات والتخزين",

      "health assistant 5": "نقوم بتخزين تاريخ محادثاتك مؤقتًا للمساعدة في تحسين استجابات الذكاء الاصطناعي لدينا. هذه البيانات غير مرتبطة بأي هوية شخصية.",

      "health assistant 6": "جميع التفاعلات تتم معالجتها بشكل آمن من خلال واجهة برمجة التطبيقات الخاصة بـ OpenAI.",

      "health assistant 7": "نحن لا نشارك أو نبيع بياناتك إلى أطراف ثالثة.",

      "Acceptance of terms": "قبول الشروط",

      "by useing this service": "باستخدامك لهذه الخدمة، فإنك تقر بأنك قد قرأت وفهمت ووافقت على هذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى الامتناع عن استخدام الخدمة.",









      "e_clinic_title": "إليك النسخة المصححة والمنسقة بشكل أكثر احترافية: ",
      "e clinic": "من نحن؟ – المشفى الإلكتروني ",
      "e_clinic_intro": "في المشفى الإلكتروني، نؤمن بأن الجميع يستحقون رعاية صحية عالية الجودة. ندرك أن التكاليف المرتفعة، ونقص الأطباء في المناطق البعيدة، وضعف أنظمة الرعاية الصحية قد تحدّ من القدرة على الوصول إلى الرعاية الطبية المناسبة. لهذا السبب، نقدم استشارات صحية مجانية مدعومة بالذكاء الاصطناعي لزيادة وعيك الطبي ومساعدتك في اتخاذ قرارات صحية أفضل.",

      "e_clinic_reason": "ما الذي نقدمه؟ ",
      // "services_title": "✅ تشخيص للأعراض – تقييم شامل للأعراض لتقديم تفسيرات محتملة لحالتك الصحية.",
      "service_diagnosis": "✅ تحليل التقارير الطبية – حمّل نتائج فحوصاتك للحصول على تحليل مدعوم بالذكاء الاصطناعي. ",
      "service_reports": "✅ مساعد صحي على مدار الساعة – احصل على إجابات فورية على استفساراتك الصحية في أي وقت ومن أي مكان.",

      "service_tests": "✅ توصيات الفحوصات الطبية – إرشادات مخصصة حول الفحوصات اللازمة، مثل الأشعة المقطعية (CT Scan)، الرنين المغناطيسي (MRI)، أو الأشعة السينية (X-Ray).",
      "service_medications": "✅ تشخيص للأعراض – تقييم شامل للأعراض لتقديم تفسيرات محتملة لحالتك الصحية.",
      // "disclaimer_note": "خطة رعاية وإرشادات دوائية: احصل على خطط رعاية مخصصة وتوصيات دوائية لدعم رحلتك الصحية.",

      "contact_us": " إخلاء المسؤولية",
      "prayer_message": "🚨 هذا المساعد الصحي هو استشاري مدعوم بالذكاء الاصطناعي، ولا يمكن اعتباره بديلاً عن الطبيب المرخّص. يُرجى استشارة أخصائي طبي للحصول على تشخيص دقيق وخطة علاج مناسبة.",

      "Get_in": "📩 للاستفسارات أو الأسئلة، تواصل معنا عبر البريد",
      "For_question": "الإلكتروني:**",
      "Email": "info@e-clinic.ai",





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