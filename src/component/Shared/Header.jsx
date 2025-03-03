// import { useState, useRef, useEffect } from "react";

// import { useTranslation } from "react-i18next";
// // import { useTranslation } from "react-i18next";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { LuPanelLeftClose, LuPanelRightClose, LuTriangleAlert } from "react-icons/lu";
// import { NavLink } from "react-router-dom";


// const Header = () => {

//     // const { t, i18n } = useTranslation();
//     // useEffect(() => {
//     //     document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
//     //   }, [i18n.language]);

//     //   const changeLanguage = (lng) => {
//     //     i18n.changeLanguage(lng);
//     //   };

//     const [isExpanded, setIsExpanded] = useState(true);
//     const [messages, setMessages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
//     const chatContainerRef = useRef(null);
//     const [inputText, setInputText] = useState(""); // State to track input text
//     const [patientName, setPatientName] = useState(""); // State to store the patient's name
//     const [isInputActive, setIsInputActive] = useState(false); // State to control input functionality
//     const [showNotification, setShowNotification] = useState(true); // State to control notification visibility
//     const [hasSentMessage, setHasSentMessage] = useState(false); // State to track if a message has been sent
//     const [fileName, setFileName] = useState(null); // State to store the uploaded file name

//     // Handle file input change
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setFileName(file.name); // Set the file name
//         } else {
//             setFileName(null); // Reset if no file is selected
//         }
//     };

//     useEffect(() => {
//         const checkLocalStorage = () => {
//             const patientDetails = localStorage.getItem("patientDetails");
//             console.log("LocalStorage patientDetails:", patientDetails); // Debug log
//             if (patientDetails) {
//                 try {
//                     const parsedDetails = JSON.parse(patientDetails);
//                     if (parsedDetails && parsedDetails.full_name) {
//                         setPatientName(parsedDetails.full_name);
//                         setShowNotification(false);
//                         setIsInputActive(true); // Enable input if patientDetails exists and has a name
//                         console.log("Input activated, patientName:", parsedDetails.full_name); // Debug log
//                     } else {
//                         setIsInputActive(false);
//                         console.log("No valid name in patientDetails");
//                     }
//                 } catch (e) {
//                     console.error("Error parsing patientDetails:", e);
//                     setIsInputActive(false);
//                 }
//             } else {
//                 setIsInputActive(false);
//                 console.log("No patientDetails in localStorage");
//             }
//         };

//         checkLocalStorage(); // Initial check
//         window.addEventListener("storage", checkLocalStorage);
//         return () => window.removeEventListener("storage", checkLocalStorage);
//     }, []);

//     const toggleSidebar = () => {
//         setIsExpanded(!isExpanded);
//     };

//    const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!isInputActive) return; // Prevent sending messages if input is not active

//     const input = event.target.elements.message;
//     const userMessage = input.value.trim();

//     if (userMessage) {
//         // Add user message immediately
//         const newMessages = [
//             ...messages,
//             { text: userMessage, sender: "user" },
//         ];
//         setMessages(newMessages);
//         setInputText(""); // Clear input state
//         setIsLoading(true); // Start loading
//         setHasSentMessage(true); // Hide notification and welcome message

//         try {
//             // Fetch patientDetails from localStorage
//             const patientDetails = JSON.parse(localStorage.getItem("patientDetails"));
//             const uniqueId = patientDetails?.id; // Extract the unique_id from patientDetails

//             if (!uniqueId) {
//                 throw new Error("Unique ID not found in patientDetails");
//             }

//             // Prepare the request body
//             const requestBody = {
//                 question: userMessage, // User's message
//                 pdf_file: fileName || "", // Include the uploaded file name (if any)
//                 unique_id: uniqueId, // Use the unique_id from patientDetails
//             };

//             // Send the user's message to the API
//             const response = await fetch("http://192.168.10.131:8002/api/v1/chat/bot", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(requestBody), // Include pdf_file and unique_id
//             });

//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }

//             const result = await response.json();
//             console.log("API Response:", result);

//             // Add AI's response to the messages
//             if (result.success && result.data && result.data.length > 0) {
//                 const aiResponse = {
//                     text: result.data[0].answer, // Use the AI's answer
//                     sender: "ai",
//                     question: userMessage, // Store the user's question for mapping
//                 };
//                 setMessages((prevMessages) => [...prevMessages, aiResponse]);
//             } else {
//                 throw new Error("Invalid response format from API");
//             }
//         } catch (error) {
//             console.error("Error sending message to API:", error);
//             // Display an error message in the chat
//             const errorMessage = {
//                 text: "Failed to get a response from the AI. Please try again.",
//                 sender: "ai",
//                 question: userMessage, // Store the user's question for mapping
//             };
//             setMessages((prevMessages) => [...prevMessages, errorMessage]);
//         } finally {
//             setIsLoading(false); // Stop loading
//         }
//     }
// };
//     // Auto-scroll to bottom whenever messages change
//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [messages]);


//     const { t, i18n } = useTranslation();

//     return (
//         <div className="flex relative overflow-hidden">
//             {/* Sidebar */}
//             <div className={`relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 hidden md:block ${isExpanded ? "w-[427px]" : "w-[50px]"} `}>
//                 <button onClick={toggleSidebar} className="top-2 right-2 absolute">
//                     {isExpanded ? (
//                         <FiChevronLeft className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
//                     ) : (
//                         <FiChevronRight className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
//                     )}
//                 </button>
//                 {isExpanded && (
//                     <div className="mt-44">
//                         <div className="flex ml-[80px] ">
//                             <img
//                                 src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740739374/Capa_1_iudxxl.png"
//                                 className="h-[336px] w-[238px] relative z-10"
//                                 alt=""
//                             />
//                             <img
//                                 src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740743595/Ellipse_1386_kidxgy.png"
//                                 alt=""
//                                 className="rotate-90 h-[300px] w-[100px] absolute top-80 ml-16 mt-14"
//                             />
//                             <h1 className="text-[40px] font=[700] roboto"> {t("Hi")}</h1>

//                         </div>
//                         <div className="mt-32 text-center text-[27px] font-[500]">
//                             <h1>I’m your AI agent from</h1>
//                             <h1 className="text-[#006400]">“E- hospital”</h1>
//                         </div>
//                         <p className="text-center text-[16px]">
//                             Ask me anything that you want to know <br />
//                             about your health issues
//                         </p>
//                     </div>
//                 )}
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col p-4 relative h-screen overflow-hidden pt-20 bg-gray-100 px-64">
//                 {/* Conditionally render notification or dedication box */}
//                 {/* AI Notification Box */}
//                 {showNotification && (
//                     <div className="flex items-center justify-center w-full h-screen absolute top-0 left-0">
//                         <div className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
//                             <LuTriangleAlert className="text-7xl font-[500] text-red-700 mb-5" />
//                             <h1 className="text-[18px] font-[500]">
//                                 This is an AI-based health support system. <br /> Please consult your doctor for medical advice.
//                             </h1>
//                             <NavLink to="/patientDetails">
//                                 <button className="text-white bg-[#006400] rounded-md px-4 mt-5">Got It</button>
//                             </NavLink>
//                         </div>
//                     </div>
//                 )}

//                 {/* Welcome Message */}
//                 {!hasSentMessage && (
//                     <div className="text-[24px] text-center font-[500] absolute inset-0 flex items-center justify-center mt-[600px]">
//                         <div>
//                             <h1>Hi, {patientName || "User"}!!</h1>
//                             <h1>How can I help you today?</h1>
//                         </div>
//                     </div>
//                 )}

//                 {/* Chat Messages (Scrollable, No Images, 100px Side Padding) */}
//                 <div
//                     ref={chatContainerRef}
//                     className="flex-1 space-y-4 p-4 "
//                     style={{
//                         maxHeight: "calc(100vh - 150px)",
//                         paddingLeft: "100px",
//                         paddingRight: "100px",
//                         overflowY: "auto" // Changed to auto for scrollbar visibility
//                     }}
//                 >
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`px-4 py-3 rounded-lg ${msg.sender === "user" ? "bg-gray-200 text-black max-w-[66%]" : "text-black w-full"}`}
//                                 style={{
//                                     whiteSpace: "normal", // Allows line breaks
//                                     wordBreak: "break-word", // Breaks long words
//                                     overflow: "hidden", // Hides overflow beyond container
//                                     maxWidth: msg.sender === "user" ? "66%" : "100%", // Maintains width limit
//                                 }}
//                             >
//                                 {msg.text}
//                             </div>
//                         </div>
//                     ))}

//                     {/* Loading Spinner for AI Response */}
//                     {isLoading && (
//                         <div className="flex justify-start">
//                             <div className="flex items-center px-4 py-2 rounded-lg bg-gray-300 text-black">
//                                 <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
//                                 <span className="ml-2">Loading...</span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Fixed Chat Input Field */}
//                 <form
//                     onSubmit={handleSendMessage}
//                     className="sticky bottom-0 w-full bg-white p-2 rounded-full shadow-md"
//                 >
//                     <div className="relative flex items-center">
//                         {/* File Upload Section with Background Color */}
//                         <div className="relative bg-[#F5F5F5] rounded-l-full p-3 ml-2 flex items-center">
//                             {/* Hidden File Input */}
//                             <input
//                                 type="file"
//                                 id="fileUpload"
//                                 className="hidden"
//                                 onChange={handleFileChange} // Handle file selection
//                                 disabled={!isInputActive} // Disable if not active
//                             />

//                             {/* Clickable Image */}
//                             <label htmlFor="fileUpload" className="cursor-pointer flex items-center">
//                                 <img
//                                     src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740749111/iconoir_attachment_qfdm9b.png"
//                                     className="h-[20px] cursor-pointer"
//                                     alt="Upload File"
//                                 />
//                                 {/* Display file name if a file is selected */}
//                                 {fileName && (
//                                     <span className="ml-2 text-sm text-gray-600 truncate max-w-[100px]">
//                                         {fileName}
//                                     </span>
//                                 )}
//                             </label>
//                         </div>

//                         {/* Input Field */}
//                         <div className="relative flex-1">
//                             <input
//                                 type="text"
//                                 name="message"
//                                 placeholder={isInputActive ? "Ask me anything about health issues" : "Please provide patient details to start chatting"}
//                                 value={inputText} // Controlled input
//                                 onChange={(e) => setInputText(e.target.value)} // Update state on change
//                                 className="flex-1 p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full"
//                                 disabled={!isInputActive} // Disable if not active
//                             />
//                             {/* Hover Tooltip for Disabled Input */}
//                             {!isInputActive && (
//                                 <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5] opacity-0 hover:opacity-100 transition-opacity duration-300">
//                                     <LuTriangleAlert className="text-xl text-red-600" />
//                                     <span className="ml-2 text-red-600 text-sm">Please provide patient details to enable chat.</span>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Send Button */}
//                         <div className="bg-[#F5F5F5] rounded-r-full p-3 mr-2 flex items-center">
//                             <button
//                                 type="submit"
//                                 className={`cursor-pointer ${inputText.trim() === "" || !isInputActive ? "text-gray-400" : "text-[#006400]"}`}
//                                 disabled={!isInputActive}
//                             >
//                                 <FiSend className="w-6 h-6" />
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Header;
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
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [isEnglish, setIsEnglish] = useState(false); // New state for language check

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };
  console.log(messages);

  useEffect(() => {
    const checkLocalStorage = () => {
      // Check patient details
      const patientDetails = localStorage.getItem("patientDetails");
      if (patientDetails) {
        try {
          const parsedDetails = JSON.parse(patientDetails);
          if (parsedDetails && parsedDetails.full_name) {
            setPatientName(parsedDetails.full_name);
            setShowNotification(false);
            setIsInputActive(true); // Enable input only if full_name exists
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

      // Check language preference and set isEnglish
      const language = localStorage.getItem("language") || i18n.language; // Use 'language' key
      setIsEnglish(language === "en"); // Set true for 'en', false for 'ar' or others
    };

    checkLocalStorage();
    window.addEventListener("storage", checkLocalStorage);
    return () => window.removeEventListener("storage", checkLocalStorage);
  }, [i18n.language]);

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

        const requestBody = {
          question: userMessage,
          pdf_file: fileName || "",
          unique_id: uniqueId,
          english: isEnglish,
        };

        const response = await fetch("http://192.168.10.131:8002/api/v1/chat/bot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          // Map the API response to messages format
          const newMessagesFromAPI = result.data.map((item) => [
            { text: item.question, sender: "user" }, // User's question
            { text: item.answer, sender: "ai" }, // AI's answer
          ]).flat(); // Flatten the array to create a single list of messages

          // Update the messages state with the new messages
          setMessages((prevMessages) => [...prevMessages, ...newMessagesFromAPI]);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error sending message to API:", error);
        const errorMessage = {
          text: t("Failed to get a response from the AI. Please try again."),
          sender: "ai",
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