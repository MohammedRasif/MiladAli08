import { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
import { LuPanelLeftClose, LuPanelRightClose, LuTriangleAlert } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
    const chatContainerRef = useRef(null);
    const [inputText, setInputText] = useState(""); // State to track input text
    const [patientName, setPatientName] = useState(""); // State to store the patient's name
    console.log("name", patientName);
    // Fetch patient details from localStorage on component mount
    useEffect(() => {
        const patientDetails = JSON.parse(localStorage.getItem("patientDetails"));
        if (patientDetails && patientDetails.name) {
            setPatientName(patientDetails.name); // Set the name if it exists
        }
        console.log(patientDetails);
    }, []);


    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
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
                        <div className="flex ml-[80px]">
                            <img
                                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740739374/Capa_1_iudxxl.png"
                                className="h-[336px] w-[238px] relative z-30"
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
                {/* AI Notification Box */}
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
                
                <div className="text-[24px] text-center font-[500] fixed bottom-32 right-[600px]">
                    <h1>Hi, {patientName || "User"}!!</h1>
                    <h1>How can I help you today?</h1>
                </div>

                {/* Chat Messages (Scrollable) */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto space-y-4 p-4"
                    style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "ai" && (
                                <img
                                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740739500/Capa_2_inzboj.png"
                                    alt="AI Avatar"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                            )}
                            <div
                                className={`px-4 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                            >
                                {msg.text}
                            </div>
                            {msg.sender === "user" && (
                                <img
                                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738133725/56832_cdztsw.png"
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full ml-2"
                                />
                            )}
                        </div>
                    ))}
                    {/* Loading Spinner for AI Response */}
                    {isLoading && (
                        <div className="flex items-center justify-start">
                            <img src="https://via.placeholder.com/40" alt="AI Avatar" className="w-10 h-10 rounded-full mr-2" />
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
                        <input
                            type="text"
                            name="message"
                            placeholder="Ask me anything about health issues"
                            value={inputText} // Controlled input
                            onChange={(e) => setInputText(e.target.value)} // Update state on change
                            className="flex-1 p-3 bg-[#F5F5F5] text-gray-600 border-none outline-none placeholder:text-gray-500"
                        />

                        {/* Send Button */}
                        <div className="bg-[#F5F5F5] rounded-r-full p-3 mr-2 flex items-center">
                            <button
                                type="submit"
                                className={`cursor-pointer ${inputText.trim() === "" ? "text-gray-400" : "text-[#006400]"
                                    }`}
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
