// App.js
import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import NewChatForm from './components/NewChatForm';
import api from './api';

function App() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await api.get('/chats');
    setChats(res.data.chats);
  };

  const handleChatCreated = async (chatId) => {
    await fetchChats();           // refresh chat list
    setSelectedChatId(chatId); // auto-select new chat
  };

  return (
    <div className="flex h-screen bg-[#f7f7f8] font-sans">
      <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">💬 LocalChat</h1>
        <NewChatForm onChatCreated={handleChatCreated} />
        <ChatList chats={chats} onSelectChat={setSelectedChatId} />
      </div>

      <div className="flex-1 p-4">
        {selectedChatId ? (
  <ChatWindow selectedChatId={selectedChatId} onTitleUpdated={fetchChats} />
) : (
  <div className="text-center text-gray-400 mt-20">
    <p>Select or Create a Chat to Begin</p>
  </div>
)}

      </div>
    </div>
  );
}

export default App;
