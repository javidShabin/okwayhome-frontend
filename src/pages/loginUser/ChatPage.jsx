import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosInstants";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUSerName] = useState(null);
  const sender = "user";

  // Get user Id
  const getUserId = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/profile",
      });
      setUserId(response.data._id);
      setUSerName(response.data.name);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstants({
        method: "GET",
        url: `/chat/${userId}`,
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage || !userId) return;

    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/chat/send",
        data: {
          userId,
          message: newMessage,
          sender,
        },
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Clear all messages
  const removeAllMessage = async () => {
    try {
      await axiosInstants({
        method: "DELETE",
        url: `/chat/${userId}`,
      });
      // Clear messages from state after deletion
      setMessages([]);
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };

  // Fetch userId on component mount
  useEffect(() => {
    getUserId();
  }, []);

  fetchMessages();


  return (
    <div className="flex flex-col h-screen md:h-[88vh] w-full bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white py-4 px-4 sm:px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl sm:text-3xl font-semibold">Chat Interface</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="text-sm">
            User: {userName ? userName : "Loading..."}
          </div>
          {/* Clear Chat Button */}
          <button
            onClick={removeAllMessage}
            className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 text-xs sm:text-base"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 chat-container">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender === sender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[65%] md:max-w-[55%] lg:max-w-[45%] px-4 py-3 rounded-lg shadow-md transition-all duration-200 ${
                    msg.sender === sender
                      ? "bg-orange-400 text-white font-semibold "
                      : "bg-purple-100 text-gray-800 border border-purple-300"
                  }`}
                >
                  <div className="text-xs font-bold mb-1 text-left">
                    {msg.sender === sender ? "You" : msg.sender}
                  </div>
                  <div className="text-sm leading-relaxed">{msg.message}</div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet...</p>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-transparent fixed bottom-0 left-0 w-full p-4 sm:p-6">
        <form
          onSubmit={sendMessage}
          className="max-w-3xl mx-auto flex items-center space-x-4 bg-white shadow-lg rounded-full p-3"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-400 px-4"
          />
          <button
            type="submit"
            className="bg-orange-400 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-500 text-xs sm:text-base"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
