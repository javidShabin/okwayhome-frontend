import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosInstants";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const sender = "user";

  const getUserId = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/profile",
      });
      setUserId(response.data._id);
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (userId) {
      const intervalId = setInterval(fetchMessages, 3000);
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage || !userId) return;
    setSending(true);
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
    } finally {
      setSending(false);
    }
  };

  const removeAllMessage = async () => {
    try {
      await axiosInstants({
        method: "DELETE",
        url: `/chat/${userId}`,
      });
      setMessages([]); // Clear messages from state after deletion
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  if (loading) return <p>Loading...</p>; // Loading indicator

  return (
    <div className="flex flex-col h-screen md:h-[88vh] w-full bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white py-4 px-4 sm:px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl sm:text-3xl font-semibold">Chat Interface</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="text-sm">
            User: {userName ? userName : "Loading..."}
          </div>
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
                  className={`text-left max-w-[75%] sm:max-w-[65%] md:max-w-[55%] lg:max-w-[45%] px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
                    msg.sender === sender
                      ? "bg-orange-400 text-white font-semibold"
                      : "bg-purple-100 text-gray-800 border border-purple-300"
                  }`}
                >
                  <div className="text-[12px] sm:text-[16px] font-bold mb-1 text-left">
                    {msg.sender === sender ? "You" : msg.sender}:{" "}
                    <span>{msg.message}</span>
                  </div>
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
            className={`bg-orange-400 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-500 text-xs sm:text-base ${
              sending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
