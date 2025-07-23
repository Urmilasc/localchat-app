import React, { useEffect, useState } from 'react';
import api from '../api';

function ChatList({ chats, onSelectChat }) {
  return (
    <div className="w-full">
      <button
        onClick={() => onSelectChat(null)}
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 mb-4 rounded hover:opacity-90 transition"
      >
        + New Chat
      </button>

      <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">Chat History</h2>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-3 bg-white rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-100 transition"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ChatList;
