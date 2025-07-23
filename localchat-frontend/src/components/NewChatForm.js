import React, { useState } from 'react';
import api from '../api';

const NewChatForm = ({ onChatCreated }) => {
  const [title, setTitle] = useState('');

  const handleCreateChat = async () => {
    const res = await api.post('/chat', { title: title || null }); // allow blank
    setTitle('');
    onChatCreated(res.data.chat.id);
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        className="border border-gray-300 px-3 py-2 rounded w-full"
        placeholder="Enter chat title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateChat} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Create
      </button>
    </div>
  );
};


export default NewChatForm;
