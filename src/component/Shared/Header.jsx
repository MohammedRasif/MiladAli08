import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LuTriangleAlert } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
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

  // Refs
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null); // Added ref for file input

  // Memoized functions
  const fetchUserIP = useCallback(async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      console.log("IP:", data.ip);
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  }, []);

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

  const handleCheckIp = useCallback(async () => {
    try {
      const ip_address = await fetchUserIP();
      if (!ip_address) throw new Error("Could not fetch IP");

      const response = await fetch("https://www.backend.e-clinic.ai/api/v1/patient/check/ip-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip_address }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const result = await response.json();
      console.log("IP Check Response:", result);

      localStorage.setItem("unique_id", result.unique_id);
      if (result.unique_id) {
        setIsInputActive(true);
        await fetchChatData(result.unique_id);
      } else {
        setShowNotification(false);
        navigate("/patientDetails");
      }
    } catch (error) {
      console.error("Error checking IP:", error);
      navigate("/patientDetails");
    }
  }, [fetchUserIP, fetchChatData, navigate]);

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

      const formData = new FormData();
      formData.append("question", userMessage || "File uploaded");
      formData.append("unique_id", uniqueId);
      formData.append("english", isEnglish);
      if (file) formData.append("pdf_file", file);

      const response = await fetch("https://www.backend.e-clinic.ai/api/v1/chat/bot", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result.success && result.data?.length > 0) {
        await fetchChatData(uniqueId); // Refresh chat list
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
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
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

    const language = localStorage.getItem("language") ;
    setIsEnglish(language);
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
    <div className="flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 hidden md:block ${
          isExpanded ? "w-[427px]" : "w-[50px]"
        }`}
      >
        <button onClick={() => setIsExpanded(!isExpanded)} className="top-2 right-2 absolute">
          {isExpanded ? (
            <FiChevronLeft className="text-2xl mt-20 bg-[#81db58] text-white rounded-full" />
          ) : (
            <FiChevronRight className="text-2xl mt-20 bg-[#81db58] text-white rounded-full" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-44">
            <div className="flex ml-[10px]">
              <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                className="h-[350px] w-[350px] relative z-10 mt-10"
                alt=""
              />
              {/* <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740743595/Ellipse_1386_kidxgy.png"
                alt=""
                className="rotate-90 h-[300px] w-[100px] absolute top-80 ml-16 mt-14"
              /> */}
              <h1 className="text-[40px]  font-[700] roboto -ml-10 ">{t("Hi")}</h1>
            </div>
            <div className="mt-32 text-center text-[23px] font-[500]">
              <h1 className="py-2">{t("I’m your AI agent from")}</h1>
              <h1 className="text-[#006400] py-2">{t("E-Hospital")}</h1>
            </div>
            <p className="text-center text-[16px] w-[90%]">{t("Ask me anything about your health issues")}</p>
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
              <button onClick={handleCheckIp} className="text-white bg-[#81db58] rounded-md px-4 mt-5">
                {t("Got It")}
              </button>
            </div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="text-[24px] text-center font-[500] absolute inset-0 flex items-center justify-center mt-[600px]">
            <h1>{t("How can I help you today?")}</h1>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 p-4"
          style={{ maxHeight: "calc(100vh - 150px)", padding: "0 100px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col w-full pb-10 `}>
              <div
                className={`px-4 py-3 rounded-lg ${msg.question == "question" ? "bg-gray-200 text-black flex items-end justify-end w-full" : " text-black flex items-end justify-end w-full"
                  }`}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  maxWidth: msg.question === "question" ? "66%" : "100%",
                }}
              >
                <div className=" text-black max-w-[66%] bg-gray-200 px-4 py-2 rounded-md">

                {msg.text ||msg.question || msg.pdf_name  }
                </div>
              </div>
              { msg.answer && (
                
              <div
                className={`px-4 py-3 rounded-lg ${msg.question == "question" ? "bg-gray-200 text-black max-w-[66%]" : "text-black flex items-start justify-start w-full "
                  }`}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  maxWidth: msg.question === "question" ? "66%" : "100%",
                }}
              >
                <div >

                <ReactMarkdown>{msg.answer}</ReactMarkdown>
                </div>
              </div>
              )}
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
            <div className="bg-[#F5F5F5] rounded-l-full p-3 ml-2 flex items-center">
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef} // Added ref
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
                  className="h-[20px]"
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
                className={`flex-1 p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full ${
                  isInputActive ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isInputActive}
              />
            </div>

            <div className="bg-[#F5F5F5] rounded-r-full p-3 mr-2 flex items-center">
              <button
                type="submit"
                className={`cursor-pointer ${
                  isInputActive && (inputText.trim() || file)
                    ? "text-[#006400]"
                    : "text-gray-400 opacity-50 cursor-not-allowed"
                }`}
                disabled={!isInputActive || (!inputText.trim() && !file)}
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