import { useState, useRef, useEffect } from "react";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

const Home = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const isUserAtBottom = useRef(true); // To track if user is at the bottom

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        const input = event.target.elements.message;
        const userMessage = input.value.trim();

        if (userMessage) {
            const newMessages = [
                ...messages,
                { text: userMessage, sender: "user" },
                { text: "This is a default AI response.", sender: "ai" } // Default AI response
            ];
            setMessages(newMessages);
            input.value = ""; // Clear input field
        }
    };

    // Check if user is at the bottom of the chat container
    useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            isUserAtBottom.current = scrollHeight - scrollTop === clientHeight;
        }
    }, [messages]);

    // Auto-scroll only if user is at the bottom
    useEffect(() => {
        if (isUserAtBottom.current && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex min-h-screen relative overflow-hidden"> {/* Ensure no outer scrollbar */}
            {/* Sidebar */}
            <div className={`relative transition-all duration-300 bg-gray-100 p-2 ${isExpanded ? "w-[13.33%]" : "w-[50px]"}`}>
                {/* Toggle Icon - Positioned at Top Right */}
                <button onClick={toggleSidebar} className="absolute top-2 right-2">
                    {isExpanded ? (
                        <LuPanelLeftClose className="text-2xl" />
                    ) : (
                        <LuPanelRightClose className="text-2xl" />
                    )}
                </button>

                {/* Content - Show Only When Sidebar is Open */}
                {isExpanded && (
                    <div className="mt-10">
                        hello
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 relative h-screen overflow-hidden"> {/* No overflow here */}
                <h1 className="text-xl font-bold mb-4">Chat Interface</h1>

                {/* Chat Messages (Scrollable) */}
                <div 
                    ref={chatContainerRef} 
                    className="flex-1 overflow-y-auto space-y-4 p-4" 
                    style={{ maxHeight: 'calc(100vh - 150px)' }} // Adjust height of chat container
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {/* Avatar for AI */}
                            {msg.sender === "ai" && (
                                <img src="https://via.placeholder.com/40" alt="AI Avatar" className="w-10 h-10 rounded-full mr-2" />
                            )}

                            {/* Message Bubble */}
                            <div className={`px-4 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>

                            {/* Avatar for User */}
                            {msg.sender === "user" && (
                                <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full ml-2" />
                            )}
                        </div>
                    ))}
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
