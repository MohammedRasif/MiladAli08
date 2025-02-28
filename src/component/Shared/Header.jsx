import { useState, useRef, useEffect } from "react";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

const Home = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
    const chatContainerRef = useRef(null);

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
        <div className="flex min-h-screen relative overflow-hidden">
            {/* Sidebar */}
            <div className={`relative transition-all duration-300 bg-gray-100 p-2 ${isExpanded ? "w-[13.33%]" : "w-[50px]"}`}>
                <button onClick={toggleSidebar} className="absolute top-2 right-2">
                    {isExpanded ? (
                        <LuPanelLeftClose className="text-2xl" />
                    ) : (
                        <LuPanelRightClose className="text-2xl" />
                    )}
                </button>
                {isExpanded && (
                    <div className="mt-10">
                        hello
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 relative h-screen overflow-hidden">
                <h1 className="text-xl font-bold mb-4">Chat Interface</h1>

                {/* Chat Messages (Scrollable) */}
                <div 
                    ref={chatContainerRef} 
                    className="flex-1 overflow-y-auto space-y-4 p-4" 
                    style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "ai" && (
                                <img src="https://via.placeholder.com/40" alt="AI Avatar" className="w-10 h-10 rounded-full mr-2" />
                            )}
                            <div className={`px-4 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>
                            {msg.sender === "user" && (
                                <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full ml-2" />
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
                    className="sticky bottom-0 w-full bg-white border-t flex items-center p-4"
                >
                    <input 
                        type="text"
                        name="message"
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Home;