import React, { useEffect, useRef, useState } from 'react';

const ChatWindow = ({ selectedChatId, onTitleUpdated }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const textareaRef = useRef(null);

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

    setIsAssistantTyping(true);

    try {
      const response = await fetch(`/api/chat/${selectedChatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: data.response },
      ]);

      setInput('');

      if (onTitleUpdated && messages.length === 0) {
        onTitleUpdated();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsAssistantTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Global shortcuts
  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Focus textarea on `/`
      if (e.key === '/' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        textareaRef.current?.focus();
      }

      // Ctrl+N or Cmd+N to start new chat (if allowed)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (onTitleUpdated && messages.length === 0) {
          onTitleUpdated(); // Reuse title update for "new chat"
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [messages, onTitleUpdated]);

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

        {isAssistantTyping && (
          <div className="italic text-gray-500">Assistant is typing...</div>
        )}
      </div>

      <div className="mt-4 flex">
        <textarea
          ref={textareaRef}
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
