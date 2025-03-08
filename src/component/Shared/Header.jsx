import { useState, useRef, useEffect, useCallback } from "react";

import { useTranslation } from "react-i18next";
import { FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LuTriangleAlert } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();




  // State declarations
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [isEnglish, setIsEnglish] = useState(false);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("")


  const handleFirstSendMessage = async (input) => {

    if (!input) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { text: userMessage || "File uploaded", sender: "user" }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const uniqueId = localStorage.getItem("unique_id");
      if (!uniqueId) throw new Error("Unique ID not found");

      const language = localStorage.getItem("language"); // Fetch language from localStorage

      const formData = new FormData();
      formData.append("question", userMessage || "File uploaded");
      formData.append("unique_id", uniqueId);
      formData.append("english", language); // Send the raw language value
      if (file) formData.append("pdf_file", file);

      console.log("Language sent:", language);

      const response = await fetch("https://www.backend.e-clinic.ai/api/v1/chat/bot", {
        method: "POST",
        body: formData,
      });
      console.log(formData);

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result.success && result.data?.length > 0) {
        setInputText("")
        setText("")
        setMessages(result.data)
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: t("Failed to get a response from the AI. Please try again."), sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
      setFile(null);
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };



  useEffect(()=>{
    const input = localStorage.getItem("text")
    if (input) {
      setInputText(input)
      setText(input)
      handleFirstSendMessage(input)
      localStorage.removeItem("text")
    }
  },[])

  // Refs
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchChatData = useCallback(async (id) => {
    try {
      const response = await fetch(`https://www.backend.e-clinic.ai/api/v1/chat/list/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const chat = await response.json();
      console.log("Chat data:", chat.data);

      setMessages(chat.data || []);
      setShowNotification(false);
      setHasSentMessage(!!chat.data?.length);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  }, []);

  const handleCheck = () => {
    const uniqueId = localStorage.getItem("unique_id");
    if (uniqueId) {
      navigate("/"); // Navigate to home if unique_id exists
    } else {
      navigate("/patientDetails"); // Navigate to patientDetails if unique_id doesn't exist
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName(null);
    }
  };

  // Handle form submission
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!isInputActive || (!inputText.trim() && !file)) return;

    const userMessage = inputText.trim();
    const newMessages = [...messages, { text: userMessage || "File uploaded", sender: "user" }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const uniqueId = localStorage.getItem("unique_id");
      if (!uniqueId) throw new Error("Unique ID not found");

      const language = localStorage.getItem("language"); // Fetch language from localStorage

      const formData = new FormData();
      formData.append("question", userMessage || "File uploaded");
      formData.append("unique_id", uniqueId);
      formData.append("english", language); // Send the raw language value
      if (file) formData.append("pdf_file", file);

      console.log("Language sent:", language);

      const response = await fetch("https://www.backend.e-clinic.ai/api/v1/chat/bot", {
        method: "POST",
        body: formData,
      });
      console.log(formData);

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result.success && result.data?.length > 0) {
        await fetchChatData(uniqueId);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: t("Failed to get a response from the AI. Please try again."), sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
      setFile(null);
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Initial setup
  useEffect(() => {
    const id = localStorage.getItem("unique_id");
    console.log("Unique ID from localStorage:", id);

    if (!id) {
      setShowNotification(true);
      setIsInputActive(false);
    } else {
      setIsInputActive(true);
      fetchChatData(id);
    }

    // Set Arabic ("ar") as the default language if not present in localStorage
    const savedLanguage = localStorage.getItem("language");
    if (!savedLanguage) {
      localStorage.setItem("language", "ar"); // Set "ar" in localStorage if not present
    }
    const initialLanguage = savedLanguage || "ar"; // Use saved language or "ar"
    i18n.changeLanguage(initialLanguage); // Apply the initial language
    setIsEnglish(initialLanguage === "en"); // Update isEnglish state
  }, [fetchChatData, i18n.language]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex relative overflow-hidden h-screen"
    dir={i18n.language === "ar" ? "rtl" : "ltr"} // Apply RTL for Arabic, LTR for English
    >

      {/* Sidebar */}
      {/* Sidebar (Moves to Left for Arabic) */}
      <div
        className={`absolute md:relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 z-10 hidden md:block ${isExpanded ? "w-[90vw] md:w-[450px]" : "w-[40px] md:w-[50px]"
          } ${i18n.language === "ar" ? "left-0" : "right-0"}`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute top-2 ${i18n.language === "ar" ? "left-2" : "right-2"}`}
          dir={i18n.language === "ar" ? "ltr": i18n.language === "en" ? "ltr" : "rtl"}
        >
          {isExpanded ? (
            <FiChevronLeft
              className={`text-xl md:text-2xl mt-10 md:mt-20 bg-[#81db58] text-white rounded-full p-1 ${i18n.language === "ar" ? "" : "rotate-180"
                }`}
            />
          ) : (
            <FiChevronRight
              className={`text-xl md:text-2xl mt-10 md:mt-20 bg-[#81db58] text-white rounded-full p-1 ${i18n.language === "ar" ? "" : "rotate-180"
                }`}
            />
          )}
        </button>
        {isExpanded && (
          <div className="px-2 md:px-0" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="flex flex-col md:flex-row items-center ml-[10px]">
              <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                className="h-[200px] md:h-[350px] w-[200px] md:w-[350px] relative z-10 mt-6 md:mt-44"
                alt=""
              />
              <h1 className="text-[28px] md:text-[40px] font-[700] roboto md:ml-[-40px]">
                {t("Hi")}
              </h1>
            </div>
            <div className="mt-8 md:mt-32 text-center text-[18px] md:text-[23px] font-[500]">
              <h1 className="py-1 md:py-2">{t("I’m your AI agent from")}</h1>
              <h1 className="text-[#81db58] py-1 md:py-2">{t("E-Hospital")}</h1>
            </div>
            <p className="text-center text-[14px] md:text-[16px] w-[90%] mx-auto">
              {t("Ask me anything about your health issues")}
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-2 md:p-4 relative h-screen overflow-hidden pt-16 md:pt-20 bg-gray-100 px-2 md:px-28 lg:px-20">
        {showNotification && (
          <div className="flex items-center justify-center w-full h-screen absolute top-0 left-0 px-2">
            <div className="w-full max-w-[90vw] md:w-[690px] h-auto md:h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg p-4 md:p-0">
              <LuTriangleAlert className="text-5xl md:text-7xl font-[500] text-red-700 mb-3 md:mb-5" />
              <h1 className="text-[16px] md:text-[18px] font-[500] px-2">
                {t("This is an AI-based health support system. Please consult your doctor for medical advice.")}
              </h1>
              <button
                onClick={handleCheck}
                className="text-white bg-[#81db58] rounded-md px-3 py-1 md:px-4 mt-3 md:mt-5 text-sm md:text-base"
              >
                {t("Got It")}
              </button>
            </div>
          </div>
        )}

        {(messages.length === 0 && !text) && (
          <div className="text-[18px] md:text-[24px] text-center font-[500] absolute inset-0 flex items-center justify-center mt-[450px] md:mt-[600px] px-2">
            <h1>{t("How can I help you today?")}</h1>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 p-2 md:p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 120px)", padding: "0 10px md:0 100px" }}
        >
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col w-full pb-6 md:pb-10"
            dir={i18n.language === "ar" ? "ltr": i18n.language === "en" ? "ltr" : "ltr"}
            >
              <div
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                  msg.question === "question"
                    ? "bg-gray-200 text-black flex items-end justify-end w-full"
                    : "text-black flex items-end justify-end w-full"
                }`}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  maxWidth: msg.question === "question" ? "80%" : "100%",
                }}
              >
                <div className="text-black max-w-[80%] md:max-w-[66%] bg-gray-200 px-3 md:px-4 py-2 rounded-md">
                  {msg.text || msg.question || msg.pdf_name}
                </div>
              </div>
              {msg.answer && (
                <div
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                    msg.question === "question"
                      ? "bg-gray-200 text-black max-w-[80%] md:max-w-[66%]"
                      : "text-black flex items-start justify-start w-full"
                  }`}
                  style={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflow: "hidden",
                    maxWidth: msg.question === "question" ? "80%" : "100%",
                  }}
                >
                  <div>
                    <ReactMarkdown>{msg.answer}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start"
            dir={i18n.language === "ar" ? "ltr": i18n.language === "en" ? "ltr" : "ltr"}
            >
              <div className="flex items-center px-3 md:px-4 py-2 rounded-lg bg-gray-300 text-black">
                <div className="w-4 md:w-5 h-4 md:h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-sm md:text-base">{t("Loading...")}</span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-0 w-full bg-white p-1 md:p-2 rounded-full shadow-md"
        >
          <div className="relative flex items-center"
          dir={i18n.language === "ar" ? "ltr": i18n.language === "en" ? "ltr" : "ltr"}
          >
            <div className="bg-[#F5F5F5] rounded-l-full p-2 md:p-3 ml-1 md:ml-2 flex items-center">
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                disabled={!isInputActive}
              />
              <label
                htmlFor="fileUpload"
                className={`cursor-pointer flex items-center ${
                  isInputActive ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740749111/iconoir_attachment_qfdm9b.png"
                  className="h-[16px] md:h-[20px]"
                  alt={t("Upload File")}
                />
                {fileName && (
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-600 truncate max-w-[80px] md:max-w-[100px]">
                    {fileName}
                  </span>
                )}
              </label>
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                name="message"
                placeholder={
                  isInputActive
                    ? t("Ask me anything about health issues")
                    : t("Please provide patient details to start chatting")
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`flex-1 p-2 md:p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full text-sm md:text-base ${
                  isInputActive ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isInputActive}
              />
            </div>

            <div className="bg-[#F5F5F5] rounded-r-full p-2 md:p-3 mr-1 md:mr-2 flex items-center">
              <button
                type="submit"
                className={`cursor-pointer ${
                  isInputActive && (inputText.trim() || file)
                    ? "text-[#006400]"
                    : "text-gray-400 opacity-50 cursor-not-allowed"
                }`}
                disabled={!isInputActive || (!inputText.trim() && !file)}
              >
                <FiSend className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;












// import { useState, useRef, useEffect, useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { LuTriangleAlert } from "react-icons/lu";
// import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Add useLocation
// import ReactMarkdown from "react-markdown";

// const Header = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation(); // Add useLocation to track route changes

//   // State declarations
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [isInputActive, setIsInputActive] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [hasSentMessage, setHasSentMessage] = useState(false);
//   const [fileName, setFileName] = useState(null);
//   const [isEnglish, setIsEnglish] = useState(false);
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState("");
//   const [uniqueId, setUniqueId] = useState(localStorage.getItem("unique_id") || null);

//   const chatContainerRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Define fetchChatData before useEffect
//   const fetchChatData = useCallback(async (id) => {
//     try {
//       const response = await fetch(`https://www.backend.e-clinic.ai/api/v1/chat/list/${id}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
//       const chat = await response.json();
//       console.log("Chat data:", chat.data);

//       setMessages(chat.data || []);
//       setShowNotification(false);
//       setHasSentMessage(!!chat.data?.length);
//     } catch (error) {
//       console.error("Error fetching chat:", error);
//     }
//   }, []);

//   const handleFirstSendMessage = async (input) => {
//     if (!input) return;

//     const userMessage = input.trim();
//     const newMessages = [...messages, { text: userMessage || "File uploaded", sender: "user" }];
//     setMessages(newMessages);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       const uniqueId = localStorage.getItem("unique_id");
//       if (!uniqueId) throw new Error("Unique ID not found");

//       const language = localStorage.getItem("language");
//       const formData = new FormData();
//       formData.append("question", userMessage || "File uploaded");
//       formData.append("unique_id", uniqueId);
//       formData.append("english", language);
//       if (file) formData.append("pdf_file", file);

//       const response = await fetch("https://www.backend.e-clinic.ai/api/v1/chat/bot", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();

//       if (result.success && result.data?.length > 0) {
//         setInputText("");
//         setText("");
//         setMessages(result.data);
//       } else {
//         throw new Error("Invalid API response");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => [
//         ...prev,
//         { text: t("Failed to get a response from the AI. Please try again."), sender: "ai" },
//       ]);
//     } finally {
//       setIsLoading(false);
//       setFile(null);
//       setFileName(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   useEffect(() => {
//     const input = localStorage.getItem("text");
//     if (input) {
//       setInputText(input);
//       setText(input);
//       handleFirstSendMessage(input);
//       localStorage.removeItem("text");
//     }
//   }, []);

//   const handleCheck = () => {
//     const existingUniqueId = localStorage.getItem("unique_id");
//     if (existingUniqueId) {
//       navigate("/"); // Navigate to home if unique_id exists
//     } else {
//       // Generate a new unique_id if it doesn't exist
//       const newUniqueId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       localStorage.setItem("unique_id", newUniqueId);
//       setUniqueId(newUniqueId);
//       setIsInputActive(true);
//       setShowNotification(false);
//       navigate("/"); // Navigate to home after setting unique_id
//     }
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//     } else {
//       setFile(null);
//       setFileName(null);
//     }
//   };

//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!isInputActive || (!inputText.trim() && !file)) return;

//     const userMessage = inputText.trim();
//     const newMessages = [...messages, { text: userMessage || "File uploaded", sender: "user" }];
//     setMessages(newMessages);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       const uniqueId = localStorage.getItem("unique_id");
//       if (!uniqueId) throw new Error("Unique ID not found");

//       const language = localStorage.getItem("language");
//       const formData = new FormData();
//       formData.append("question", userMessage || "File uploaded");
//       formData.append("unique_id", uniqueId);
//       formData.append("english", language);
//       if (file) formData.append("pdf_file", file);

//       const response = await fetch("https://www.backend.e-clinic.ai/api/v1/chat/bot", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();

//       if (result.success && result.data?.length > 0) {
//         await fetchChatData(uniqueId);
//       } else {
//         throw new Error("Invalid API response");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => [
//         ...prev,
//         { text: t("Failed to get a response from the AI. Please try again."), sender: "ai" },
//       ]);
//     } finally {
//       setIsLoading(false);
//       setFile(null);
//       setFileName(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   // Initial setup and re-check unique_id on route change
//   useEffect(() => {
//     const id = localStorage.getItem("unique_id");
//     console.log("Unique ID from localStorage:", id);

//     if (!id) {
//       setShowNotification(true);
//       setIsInputActive(false);
//     } else {
//       setUniqueId(id);
//       setIsInputActive(true);
//       setShowNotification(false);
//       fetchChatData(id);
//     }
//     const savedLanguage = localStorage.getItem("language");
//     if (!savedLanguage) {
//       localStorage.setItem("language", "ar");
//     }
//     const initialLanguage = savedLanguage || "ar";
//     i18n.changeLanguage(initialLanguage);
//     setIsEnglish(initialLanguage === "en");
//   }, [fetchChatData, i18n, location]); // Add location to dependencies to re-run on route change

//   // Save messages to localStorage
//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//   }, [messages]);

//   // Scroll to bottom
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div
//       className="flex relative overflow-hidden h-screen"
//       dir={i18n.language === "ar" ? "rtl" : "ltr"} // Apply RTL for Arabic, LTR for English
//     >
//       {/* Sidebar (Moves to Right for Arabic) */}
//       <div
//         className={`absolute md:relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 z-10 hidden md:block ${isExpanded ? "w-[90vw] md:w-[450px]" : "w-[40px] md:w-[50px]"
//           } ${i18n.language === "ar" ? "right-0" : "left-0"}`}
//       >
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className={`absolute top-2 ${i18n.language === "ar" ? "left-2" : "right-2"}`}
//         >
//           {isExpanded ? (
//             <FiChevronLeft
//               className={`text-xl md:text-2xl mt-10 md:mt-20 bg-[#81db58] text-white rounded-full p-1 ${i18n.language === "ar" ? "rotate-180" : ""
//                 }`}
//             />
//           ) : (
//             <FiChevronRight
//               className={`text-xl md:text-2xl mt-10 md:mt-20 bg-[#81db58] text-white rounded-full p-1 ${i18n.language === "ar" ? "rotate-180" : ""
//                 }`}
//             />
//           )}
//         </button>
//         {isExpanded && (
//           <div className="px-2 md:px-0" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
//             <div className="flex flex-col md:flex-row items-center ml-[10px]">
//               <img
//                 src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
//                 className="h-[200px] md:h-[350px] w-[200px] md:w-[350px] relative z-10 mt-6 md:mt-44"
//                 alt=""
//               />
//               <h1 className="text-[28px] md:text-[40px] font-[700] roboto md:ml-[-40px]">
//                 {t("Hi")}
//               </h1>
//             </div>
//             <div className="mt-8 md:mt-32 text-center text-[18px] md:text-[23px] font-[500]">
//               <h1 className="py-1 md:py-2">{t("I’m your AI agent from")}</h1>
//               <h1 className="text-[#006400] py-1 md:py-2">{t("E-Hospital")}</h1>
//             </div>
//             <p className="text-center text-[14px] md:text-[16px] w-[90%] mx-auto">
//               {t("Ask me anything about your health issues")}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col p-2 md:p-4 relative h-screen overflow-hidden pt-16 md:pt-20 bg-gray-100 px-2 md:px-28 lg:px-28">
//         {showNotification && (
//           <div className="flex items-center justify-center w-full h-screen absolute top-0 left-0 px-2">
//           <div className="w-full max-w-[90vw] md:w-[690px] h-auto md:h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg p-4 md:p-0">
//             <LuTriangleAlert className="text-5xl md:text-7xl font-[500] text-red-700 mb-3 md:mb-5" />
//             <h1 className="text-[16px] md:text-[18px] font-[500] px-2">
//               {t("This is an AI-based health support system. Please consult your doctor for medical advice.")}
//             </h1>
//             <button
//               onClick={handleCheck}
//               className="text-white bg-[#81db58] rounded-md px-3 md:px-4 mt-3 md:mt-5 text-sm md:text-base"
//             >
//               {t("Got It")}
//             </button>
//           </div>
//         </div>
//         )}

//         {(messages.length === 0 && !text) && (
//           <div className="text-[18px] md:text-[24px] text-center font-[500] absolute inset-0 flex items-center justify-center mt-[450px] md:mt-[600px] px-2">
//             <h1>{t("How can I help you today?")}</h1>
//           </div>
//         )}

//         <div
//           ref={chatContainerRef}
//           className="flex-1 space-y-4 p-2 md:p-4 overflow-y-auto"
//           style={{ maxHeight: "calc(100vh - 120px)", padding: "0 10px md:0 100px" }}
//         >
//           {messages.map((msg, index) => (
//             <div key={index} className="flex flex-col w-full pb-6 md:pb-10">
//               <div
//                 className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${msg.question === "question"
//                     ? "bg-gray-200 text-black flex items-end justify-end w-full"
//                     : "text-black flex items-end justify-end w-full"
//                   }`}
//                 style={{
//                   whiteSpace: "normal",
//                   wordBreak: "break-word",
//                   overflow: "hidden",
//                   maxWidth: msg.question === "question" ? "80%" : "100%",
//                 }}
//               >
//                 <div className="text-black max-w-[80%] md:max-w-[66%] bg-gray-200 px-3 md:px-4 py-2 rounded-md">
//                   {msg.text || msg.question || msg.pdf_name}
//                 </div>
//               </div>
//               {msg.answer && (
//                 <div
//                   className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${msg.question === "question"
//                       ? "bg-gray-200 text-black max-w-[80%] md:max-w-[66%]"
//                       : "text-black flex items-start justify-start w-full"
//                     }`}
//                   style={{
//                     whiteSpace: "normal",
//                     wordBreak: "break-word",
//                     overflow: "hidden",
//                     maxWidth: msg.question === "question" ? "80%" : "100%",
//                   }}
//                 >
//                   <div>
//                     <ReactMarkdown>{msg.answer}</ReactMarkdown>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="flex items-center px-3 md:px-4 py-2 rounded-lg bg-gray-300 text-black">
//                 <div className="w-4 md:w-5 h-4 md:h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="ml-2 text-sm md:text-base">{t("Loading...")}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <form
//           onSubmit={handleSendMessage}
//           className="sticky bottom-0 w-full bg-white p-1 md:p-2 rounded-full shadow-md"
//         >
//           <div className="relative flex items-center">
//             <div className="bg-[#F5F5F5] rounded-l-full p-2 md:p-3 ml-1 md:ml-2 flex items-center">
//               <input
//                 type="file"
//                 id="fileUpload"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}
//                 disabled={!isInputActive}
//               />
//               <label
//                 htmlFor="fileUpload"
//                 className={`cursor-pointer flex items-center ${isInputActive ? "" : "opacity-50 cursor-not-allowed"
//                   }`}
//               >
//                 <img
//                   src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740749111/iconoir_attachment_qfdm9b.png"
//                   className="h-[16px] md:h-[20px] rounded-full"
//                   alt={t("Upload File")}
//                 />
//                 {fileName && (
//                   <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-600 truncate max-w-[80px] md:max-w-[100px]">
//                     {fileName}
//                   </span>
//                 )}
//               </label>
//             </div>

//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 name="message"
//                 placeholder={
//                   isInputActive
//                     ? t("Ask me anything about health issues")
//                     : t("Please provide patient details to start chatting")
//                 }
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 className={`flex-1 p-2 md:p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full text-sm md:text-base ${isInputActive ? "" : "opacity-50 cursor-not-allowed"
//                   }`}
//                 disabled={!isInputActive}
//               />
//             </div>

//             <div className="bg-[#F5F5F5] rounded-r-full p-2 md:p-3 mr-1 md:mr-2 flex items-center">
//               <button
//                 type="submit"
//                 className={`cursor-pointer ${isInputActive && (inputText.trim() || file)
//                     ? "text-[#006400]"
//                     : "text-gray-400 opacity-50 cursor-not-allowed"
//                   }`}
//                 disabled={!isInputActive || (!inputText.trim() && !file)}
//               >
//                 <FiSend className="w-5 md:w-6 h-5 md:h-6" />
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Header;