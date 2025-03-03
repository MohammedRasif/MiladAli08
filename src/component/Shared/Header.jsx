import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuPanelLeftClose, LuPanelRightClose, LuTriangleAlert } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState([]); // Chat messages state
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [isEnglish, setIsEnglish] = useState(false);
  const [file, setFile] = useState("")

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages)); // Load saved messages
      } catch (e) {
        console.error("Error parsing saved messages:", e);
        setMessages([]); // Reset to empty array if parsing fails
      }
    }

    const checkLocalStorage = () => {
      const patientDetails = localStorage.getItem("patientDetails");
      if (patientDetails) {
        try {
          const parsedDetails = JSON.parse(patientDetails);
          if (parsedDetails && parsedDetails.full_name) {
            setPatientName(parsedDetails.full_name);
            setShowNotification(false);
            setIsInputActive(true);
          } else {
            setIsInputActive(false);
            setPatientName("");
            setShowNotification(true);
          }
        } catch (e) {
          console.error("Error parsing patientDetails:", e);
          setIsInputActive(false);
          setPatientName("");
          setShowNotification(true);
        }
      } else {
        setIsInputActive(false);
        setPatientName("");
        setShowNotification(true);
      }

      const language = localStorage.getItem("language") || i18n.language;
      setIsEnglish(language === "en");
    };

    checkLocalStorage();
    window.addEventListener("storage", checkLocalStorage);
    return () => window.removeEventListener("storage", checkLocalStorage);
  }, [i18n.language]);

  // Save messages to localStorage whenever the messages state changes
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      setFile(selectedFile); // Store the actual file
      setFileName(selectedFile.name); // Store the file name
    } else {
      setFile(null);
      setFileName(null);
    }
  };
  

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!isInputActive) return;
  
    const input = event.target.elements.message;
    const userMessage = input.value.trim();
  
    if (userMessage) {
      // Add user's question as a message immediately
      const newMessages = [...messages, { text: userMessage, sender: "user" }];
      setMessages(newMessages);
      setInputText("");
      setIsLoading(true);
      setHasSentMessage(true);
  
      try {
        const patientDetails = JSON.parse(localStorage.getItem("patientDetails"));
        const uniqueId = patientDetails?.id;
  
        if (!uniqueId) throw new Error("Unique ID not found in patientDetails");
  
        // Create FormData object\
        console.log("isEnglish",isEnglish);
        
        const formData = new FormData();
        formData.append("question", userMessage);
        formData.append("unique_id", uniqueId);
        formData.append("english", isEnglish);
  
        // Append file if available
        if (file) {
          formData.append("pdf_file", file); // 'file' should be the selected PDF file object
        }
  
        const response = await fetch("http://192.168.10.131:8002/api/v1/chat/bot", {
          method: "POST",
          body: formData, // No need to set headers; fetch will automatically handle multipart data
        });
  
        if (!response.ok) throw new Error("Network response was not ok");
  
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          // Get the latest AI response
          const latestResponse = result.data[result.data.length - 1];
          const aiResponse = {
            text: latestResponse.answer,
            sender: "ai",
            question: userMessage,
          };
  
          // Append the AI response to the existing messages
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error sending message to API:", error);
        const errorMessage = {
          text: t("Failed to get a response from the AI. Please try again."),
          sender: "ai",
          question: userMessage,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 hidden md:block ${isExpanded ? "w-[427px]" : "w-[50px]"
          }`}
      >
        <button onClick={toggleSidebar} className="top-2 right-2 absolute">
          {isExpanded ? (
            <FiChevronLeft className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
          ) : (
            <FiChevronRight className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-44">
            <div className="flex ml-[80px]">
              <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740739374/Capa_1_iudxxl.png"
                className="h-[336px] w-[238px] relative z-10"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740743595/Ellipse_1386_kidxgy.png"
                alt=""
                className="rotate-90 h-[300px] w-[100px] absolute top-80 ml-16 mt-14"
              />
              <h1 className="text-[40px] font-[700] roboto">{t("Hi")}</h1>
            </div>
            <div className="mt-32 text-center text-[27px] font-[500]">
              <h1>{t("I’m your AI agent from")}</h1>
              <h1 className="text-[#006400]">{t("E-Hospital")}</h1>
            </div>
            <p className="text-center text-[16px]">{t("Ask me anything about your health issues")}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 relative h-screen overflow-hidden pt-20 bg-gray-100 px-64">
        {showNotification && (
          <div className="flex items-center justify-center w-full h-screen absolute top-0 left-0">
            <div className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
              <LuTriangleAlert className="text-7xl font-[500] text-red-700 mb-5" />
              <h1 className="text-[18px] font-[500]">
                {t("This is an AI-based health support system. Please consult your doctor for medical advice.")}
              </h1>
              <NavLink to="/patientDetails">
                <button className="text-white bg-[#006400] rounded-md px-4 mt-5">{t("Got It")}</button>
              </NavLink>
            </div>
          </div>
        )}

        {!hasSentMessage && (
          <div className="text-[24px] text-center font-[500] absolute inset-0 flex items-center justify-center mt-[600px]">
            <div>
              <h1>{t("Hi, {{name}}!!", { name: patientName || "User" })}</h1>
              <h1>{t("How can I help you today?")}</h1>
            </div>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 p-4"
          style={{
            maxHeight: "calc(100vh - 150px)",
            paddingLeft: "100px",
            paddingRight: "100px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-lg ${msg.sender === "user" ? "bg-gray-200 text-black max-w-[66%]" : "text-black w-full"
                  }`}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  maxWidth: msg.sender === "user" ? "66%" : "100%",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center px-4 py-2 rounded-lg bg-gray-300 text-black">
                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">{t("Loading...")}</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="sticky bottom-0 w-full bg-white p-2 rounded-full shadow-md">
          <div className="relative flex items-center">
            <div className="relative bg-[#F5F5F5] rounded-l-full p-3 ml-2 flex items-center">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
                disabled={!isInputActive}
              />
              <label htmlFor="fileUpload" className="cursor-pointer flex items-center">
                <img
                  src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740749111/iconoir_attachment_qfdm9b.png"
                  className="h-[20px] cursor-pointer"
                  alt={t("Upload File")}
                />
                {fileName && (
                  <span className="ml-2 text-sm text-gray-600 truncate max-w-[100px]">{fileName}</span>
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
                className="flex-1 p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full"
                disabled={!isInputActive}
              />
              {!isInputActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5] opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <LuTriangleAlert className="text-xl text-red-600" />
                  <span className="ml-2 text-red-600 text-sm">
                    {t("Please provide patient details to enable chat.")}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-[#F5F5F5] rounded-r-full p-3 mr-2 flex items-center">
              <button
                type="submit"
                className={`cursor-pointer ${inputText.trim() === "" || !isInputActive ? "text-gray-400" : "text-[#006400]"
                  }`}
                disabled={!isInputActive}
              >
                <FiSend className="w-6 h-6" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;