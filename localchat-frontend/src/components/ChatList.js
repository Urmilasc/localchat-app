import React, { useState } from 'react';
import api from '../api';

function ChatList({ chats, onSelectChat, selectedChatId, fetchChats }) {
  const handleRenameChat = async (chatId) => {
    const newTitle = prompt("Enter new chat title:");
    if (!newTitle) return;
    try {
      await fetch(`/api/${chatId}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTitle }),
      });
      fetchChats(); // Refresh the chat list
    } catch (error) {
      console.error("Rename failed:", error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    try {
      await fetch(`/api/${chatId}`, {
        method: 'DELETE',
      });
      fetchChats(); // Refresh the chat list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => onSelectChat(null)}
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 mb-4 rounded hover:opacity-90 transition"
      >
        + New Chat
      </button>

      <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">
        Chat History
      </h2>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-3 bg-white rounded-lg shadow-sm mb-2 transition group hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <span
                onClick={() => onSelectChat(chat.id)}
                className={`cursor-pointer truncate ${
                  selectedChatId === chat.id ? 'font-bold' : ''
                }`}
              >
                {chat.title || 'Untitled Chat'}
              </span>
              <div className="space-x-1 text-xs opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => handleRenameChat(chat.id)}>✏️</button>
                <button onClick={() => handleDeleteChat(chat.id)}>🗑️</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
