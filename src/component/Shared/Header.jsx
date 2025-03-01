import { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuPanelLeftClose, LuPanelRightClose, LuTriangleAlert } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
    const chatContainerRef = useRef(null);
    const [inputText, setInputText] = useState(""); // State to track input text
    const [patientName, setPatientName] = useState(""); // State to store the patient's name
    const [isInputActive, setIsInputActive] = useState(false); // State to control input functionality
    const [showNotification, setShowNotification] = useState(true); // State to control notification visibility
    const [hasSentMessage, setHasSentMessage] = useState(false); // State to track if a message has been sent

    useEffect(() => {
        const checkLocalStorage = () => {
            const patientDetails = localStorage.getItem("patientDetails");
            console.log("LocalStorage patientDetails:", patientDetails); // Debug log
            if (patientDetails) {
                try {
                    const parsedDetails = JSON.parse(patientDetails);
                    if (parsedDetails && parsedDetails.name) {
                        setPatientName(parsedDetails.name);
                        setShowNotification(false);
                        setIsInputActive(true); // Enable input if patientDetails exists and has a name
                        console.log("Input activated, patientName:", parsedDetails.name); // Debug log
                    } else {
                        setIsInputActive(false);
                        console.log("No valid name in patientDetails");
                    }
                } catch (e) {
                    console.error("Error parsing patientDetails:", e);
                    setIsInputActive(false);
                }
            } else {
                setIsInputActive(false);
                console.log("No patientDetails in localStorage");
            }
        };

        checkLocalStorage(); // Initial check
        window.addEventListener("storage", checkLocalStorage);
        return () => window.removeEventListener("storage", checkLocalStorage);
    }, []);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (!isInputActive) return; // Prevent sending messages if input is not active

        const input = event.target.elements.message;
        const userMessage = input.value.trim();

        if (userMessage) {
            // Add user message immediately
            const newMessages = [
                ...messages,
                { text: userMessage, sender: "user" },
            ];
            setMessages(newMessages);
            input.value = ""; // Clear input field
            setIsLoading(true); // Start loading
            setHasSentMessage(true); // Hide notification and welcome message

            // Simulate AI response with a delay
            setTimeout(() => {
                const aiResponse = { text: "This is a default AI response.", sender: "ai" };
                setMessages((prevMessages) => [...prevMessages, aiResponse]);
                setIsLoading(false); // Stop loading
            }, 1000); // 1-second delay for simulation
        }
    };

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex relative overflow-hidden">
            {/* Sidebar */}
            <div className={`relative transition-all duration-300 bg-white shadow-2xl rounded-2xl p-2 ${isExpanded ? "w-[427px]" : "w-[50px]"}`}>
                <button onClick={toggleSidebar} className="top-2 right-2 absolute">
                    {isExpanded ? (
                        <FiChevronLeft className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
                    ) : (
                        <FiChevronRight className="text-2xl mt-20 bg-[#006400] text-white rounded-full" />
                    )}
                </button>
                {isExpanded && (
                    <div className="mt-44">
                        <div className="flex ml-[80px] ">
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
                            <h1 className="text-[40px] font=[700] roboto">Hi</h1>
                        </div>
                        <div className="mt-32 text-center text-[27px] font-[500]">
                            <h1>I’m your AI agent from</h1>
                            <h1 className="text-[#006400]">“E- hospital”</h1>
                        </div>
                        <p className="text-center text-[16px]">
                            Ask me anything that you want to know <br />
                            about your health issues
                        </p>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 relative h-screen overflow-hidden pt-20 bg-gray-100">
                {/* Conditionally render notification or dedication box */}
                {!hasSentMessage && (
                    <>
                        {showNotification ? (
                            // AI Notification Box (shown if localStorage has no patientDetails)
                            <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
                                <div className="w-[690px] h-[324px] text-center bg-white flex flex-col justify-center items-center border border-gray-200 rounded-2xl shadow-lg">
                                    <LuTriangleAlert className="text-7xl font-[500] text-red-700 mb-5" />
                                    <h1 className="text-[18px] font-[500]">
                                        This is an AI-based health support system. <br /> Please consult your doctor for medical advice.
                                    </h1>
                                    <NavLink to="/patientDetails">
                                        <button className="text-white bg-[#006400] rounded-md px-4 mt-5">Got It</button>
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </>
                )}

                {/* Welcome Message */}
                {!hasSentMessage && (
                    <div className="text-[24px] text-center font-[500] fixed bottom-32 right-[600px]">
                        <h1>Hi, {patientName || "User"}!!</h1>
                        <h1>How can I help you today?</h1>
                    </div>
                )}

                {/* Chat Messages (Scrollable, No Images, 100px Side Padding) */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto space-y-4 p-4"
                    style={{ maxHeight: "calc(100vh - 150px)", paddingLeft: "100px", paddingRight: "100px" }}
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`px-4 py-3 rounded-lg ${msg.sender === "user" ? "bg-gray-200 text-black max-w-[66%]" : " text-black w-full"}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Loading Spinner for AI Response */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-center px-4 py-2 rounded-lg bg-gray-300 text-black">
                                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="ml-2">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fixed Chat Input Field */}
                <form
                    onSubmit={handleSendMessage}
                    className="sticky bottom-0 w-full bg-white p-2 rounded-full"
                >
                    <div className="relative flex items-center">
                        {/* File Upload Section with Background Color */}
                        <div className="relative bg-[#F5F5F5] rounded-l-full p-3 ml-2 flex items-center">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                id="fileUpload"
                                className="hidden"
                                onChange={(event) => console.log(event.target.files[0])}
                                disabled={!isInputActive} // Disable if not active
                            />

                            {/* Clickable Image */}
                            <label htmlFor="fileUpload" className="cursor-pointer">
                                <img
                                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740749111/iconoir_attachment_qfdm9b.png"
                                    className="h-[20px] cursor-pointer"
                                    alt="Upload File"
                                />
                            </label>
                        </div>

                        {/* Input Field */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                name="message"
                                placeholder={isInputActive ? "Ask me anything about health issues" : "Please provide patient details to start chatting"}
                                value={inputText} // Controlled input
                                onChange={(e) => setInputText(e.target.value)} // Update state on change
                                className="flex-1 p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500 w-full"
                                disabled={!isInputActive} // Disable if not active
                            />
                            {/* Hover Tooltip for Disabled Input */}
                            {!isInputActive && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5] opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <LuTriangleAlert className="text-xl text-red-600" />
                                    <span className="ml-2 text-red-600 text-sm">Please provide patient details to enable chat.</span>
                                </div>
                            )}
                        </div>

                        {/* Send Button */}
                        <div className="bg-[#F5F5F5] rounded-r-full p-3 mr-2 flex items-center">
                            <button
                                type="submit"
                                className={`cursor-pointer ${inputText.trim() === "" || !isInputActive ? "text-gray-400" : "text-[#006400]"
                                    }`}
                                disabled={!isInputActive} // Disable if not active
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