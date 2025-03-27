import { useState, useRef, useEffect, useCallback } from "react";

import { useTranslation } from "react-i18next";
import { FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LuTriangleAlert } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tappable from 'react-tappable';
import { BiCloudUpload } from "react-icons/bi";


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
  const [isChecked, setIsChecked] = useState(false);


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

      const response = await fetch("http://192.168.10.131:3000/api/v1/chat/bot", {
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



  useEffect(() => {
    const input = localStorage.getItem("text")
    if (input) {
      setInputText(input)
      setText(input)
      handleFirstSendMessage(input)
      localStorage.removeItem("text")
    }
  }, [])

  // Refs
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);


  //------------------------------------------

  const fetchChatData = useCallback(async (id) => {
    try {
      const response = await fetch(`http://192.168.10.131:3000/api/v1/chat/list/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const chat = await response.json();

      // Set the complete chat history
      setMessages(chat.data || []);
      setShowNotification(false);
      setHasSentMessage(!!chat.data?.length);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  }, []);



  const id = localStorage.getItem("unique_id")
  useEffect(() => {
    console.log("id", id);

    if (id) {
      fetchChatData(id);
    }
  }, [id, fetchChatData]);

  // -------------------------------------

  const handleCheck = () => {
    const patientDetails = localStorage.getItem("pationDetails");
    if (patientDetails) {
      navigate("/"); // Go to home if patientDetails exists
    } else {
      navigate("/patientDetails"); // Go to patientDetails if it doesn’t
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

   //-----------------------------------------
   useEffect(() => {
    const page_url = window.location.href;

    const unique_id = localStorage.getItem("unique_id");
    const postData = {
      page_url, 
      unique_id,
    };
    console.log(postData);

    const sendDataToDashboard = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.131:3000/api/v1/dashboard/activity/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(postData), 
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);
      } catch (error) {
        console.error("Failed to send data:", error);
      }
    };

    sendDataToDashboard();
  }, []);




  // --------------------------------------------------
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!isInputActive || (!inputText.trim() && !file)) return;

    setIsLoading(true);
    const userMessage = inputText.trim();

    try {
      const uniqueId = localStorage.getItem("unique_id");
      if (!uniqueId) throw new Error("Unique ID not found");

      const language = localStorage.getItem("language");
      const formData = new FormData();
      formData.append("question", userMessage || "File uploaded");
      formData.append("unique_id", uniqueId);
      formData.append("english", language);
      if (file) formData.append("pdf_file", file);

      const response = await fetch("http://192.168.10.131:3000/api/v1/chat/bot", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result.success && result.data?.length > 0) {
        // Replace the entire messages state with the complete history from the API
        setMessages(result.data);
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
      setInputText("");
      setFile(null);
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Initial setup
  useEffect(() => {
    const id = localStorage.getItem("pationDetails");
    console.log(id);

    if (!id) {
      setShowNotification(true);
      setIsInputActive(true);
    } else {
      setIsInputActive(true);
      // setShowNotification(false);

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
          dir={i18n.language === "ar" ? "ltr" : i18n.language === "en" ? "ltr" : "rtl"}
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
                className="h-[200px] md:h-[350px] w-[200px] md:w-[350px] relative z-10 mt-6 md:mt-44 -ml-[30px]"
                alt=""
              />
              <h1
                className={`text-[24px] md:text-[40px] font-[700] roboto md:ml-[-40px] ${i18n.language === "ar" ? "fixed right-3 top-36" : ""
                  }`} // Apply fixed positioning only for Arabic
                dir={i18n.language === "ar" ? "rtl" : "ltr"} // Corrected direction
              >
                {t("Hi")}
              </h1>
            </div>
            <div className="mt-8  text-center text-[18px] md:text-[23px] font-[500]">
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
          <div className="flex items-center justify-center w-full absolute px-2 lg:mt-40 md:mt-96 mt-40 lg:-ml-20 md:-ml-20 -ml-2">
            <div className="w-full max-w-[90vw] md:w-[690px] h-auto md:h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg p-4 md:p-0">
              <LuTriangleAlert className="text-5xl md:text-7xl font-[500] text-red-700 mb-3 md:mb-5" />
              <h1 className="text-[16px] md:text-[18px] font-[500] px-2">
                {t("This system provides general guidance only, for specific medical inquiries please consult a specialist.")}
              </h1>
              <Tappable onTap={handleCheck}>
                <button
                  className={`text-white bg-[#81db58] rounded-md px-3 py-1 md:px-4 mt-3 md:mt-5 text-sm md:text-base w-full max-w-[200px] md:max-w-none ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isChecked} // Disable button if checkbox is not checked
                 
                >
                  {t("Got It")}
                </button>

              </Tappable>
              {/* Checkbox, shortened text, and Terms of Use on the same line */}
              <div className="mt-3 md:mt-5 text-sm md:text-base  items-center justify-center space-x-2">
                <div className="space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-2 border-gray-300 rounded accent-[#81db58] focus:ring-[#81db58] relative top-[2px]"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)} // Update state on checkbox change
                  />
                  <span className="text-gray-600">
                    {t("By reviewing the")}
                    <NavLink to="/disclaimer" className="text-blue-600 underline">
                      {t("Terms of Use")}
                    </NavLink>
                    {t("I agree to proceed with this site")}
                  </span>
                </div>

                {/* <a href="/terms-of-use" className="text-blue-600 underline">
                  {t("Terms of Use")}
                </a> */}
              </div>
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
              dir={i18n.language === "ar" ? "ltr" : i18n.language === "en" ? "ltr" : "ltr"}
            >
              <div
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${msg.question === "question"
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
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-lg ${msg.question === "question"
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
              dir={i18n.language === "ar" ? "ltr" : i18n.language === "en" ? "ltr" : "ltr"}
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
          className="sticky bottom-0 w-full bg-[#81db58] p-1 md:p-2 rounded-full shadow-md"
        >
          <div
            className="relative flex items-center"
            dir={i18n.language === "ar" ? "rtl" : "ltr"} // RTL for Arabic, LTR for English
          >
            {/* Upload Icon Section */}
            <div
              className={`bg-[#81db58] p-2 md:p-2 flex items-center ${i18n.language === "ar" ? "rounded-r-full mr-1 md:mr-2" : "rounded-l-full ml-1 md:ml-2"
                }`}
            >
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
                className={`cursor-pointer flex items-center ${isInputActive ? "" : "opacity-50 cursor-not-allowed"
                  }`}
              >
                <BiCloudUpload
                  className="h-[30px] md:h-[33px] w-[30px] md:w-[33px] text-white" // Icon stays white always
                  alt={t(i18n.language === "ar" ? "رفع ملف" : "Upload File")} // Arabic or English
                />
                {fileName && (
                  <span
                    className={`text-sm md:text-base text-white truncate max-w-[120px] md:max-w-[150px] ${i18n.language === "ar" ? "mr-2 md:mr-3" : "ml-2 md:ml-3"
                      }`}
                  >
                    {fileName}
                  </span>
                )}
              </label>
            </div>

            {/* Input Field */}
            <div className="relative flex-1">
              <input
                type="text"
                name="message"
                placeholder={
                  isInputActive
                    ? t(
                      i18n.language === "ar"
                        ? "اسألني أي شيء عن المشكلات الصحية" // Arabic
                        : "Ask me anything about health issues" // English
                    )
                    : t(
                      i18n.language === "ar"
                        ? "يرجى تقديم تفاصيل المريض لبدء المحادثة" // Arabic
                        : "Please provide patient details to start chatting" // English
                    )
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`flex-1 p-2 md:p-2 bg-[#81db58] text-black font-bold border-none outline-none placeholder:text-gray-500 w-full text-sm md:text-base ${i18n.language === "ar" ? "text-right" : "text-left"
                  } ${isInputActive ? "" : "opacity-50 cursor-not-allowed"}`}
                disabled={!isInputActive}
              />
            </div>

            {/* Send Button */}
            <div
              className={`bg-[#81db58] p-2 md:p-3 flex items-center ${i18n.language === "ar" ? "rounded-l-full ml-1 md:ml-2" : "rounded-r-full mr-1 md:mr-2"
                }`}
            >
              <button
                type="submit"
                className={`cursor-pointer ${isInputActive && (inputText.trim() || file)
                  ? ""
                  : "opacity-50 cursor-not-allowed"
                  }`}
                disabled={!isInputActive || (!inputText.trim() && !file)}
              >
                <FiSend
                  className="w-6 md:w-7 h-6 md:h-7 text-white" // Icon stays white always
                  style={{ strokeWidth: "2.5" }} // Keeps the thicker look
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;