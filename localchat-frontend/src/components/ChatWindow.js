import React, { useEffect, useState } from 'react';

const ChatWindow = ({ selectedChatId, onTitleUpdated }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) return;
      try {
        const response = await fetch(`/api/chat/${selectedChatId}`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch(`/api/chat/${selectedChatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Append user and assistant messages
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: data.response },
      ]);

      setInput('');

      // 🔄 Trigger chat list refresh if this is the first message
      if (onTitleUpdated && messages.length === 0) {
        onTitleUpdated();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
        Select or create a chat to begin
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xl ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <textarea
          rows="2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
