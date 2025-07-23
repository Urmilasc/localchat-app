const pool = require('../db');
const { getOllamaResponse } = require('../services/ollamaService');

// Auto-generate title if not provided
function generateTitle() {
  return `Chat ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;
}

// POST /api/chat → Create new chat
const createNewChat = async (req, res) => {
  const { title } = req.body;
  const chatTitle = title || generateTitle();

  try {
    const result = await pool.query(
      'INSERT INTO chats (title) VALUES ($1) RETURNING *',
      [chatTitle]
    );

    res.status(201).json({
      message: 'Chat created successfully',
      chat: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
};

// POST /api/chat/:chatId/message → Send message & get response
const sendMessageToChat = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;

  try {
    // Save User Message
    await pool.query(
      'INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)',
      [chatId, 'user', message]
    );

    // Check if chat has a title
    const chatRes = await pool.query('SELECT title FROM chats WHERE id = $1', [chatId]);
    const chat = chatRes.rows[0];

    if (chat && (!chat.title || chat.title.trim().startsWith('Chat '))) {
      const newTitle = message.length > 30 ? message.slice(0, 30) + '…' : message;
      await pool.query('UPDATE chats SET title = $1 WHERE id = $2', [newTitle, chatId]);
    }

    // Get response from Ollama
    const response = await getOllamaResponse(message);

    // Save Assistant Response
    await pool.query(
      'INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)',
      [chatId, 'assistant', response]
    );

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};


const getAllChats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC');

    res.status(200).json({ chats: result.rows });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC',
      [chatId]
    );

    res.status(200).json({ messages: result.rows });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


// Rename a chat
const renameChat = async (req, res) => {
  const { chatId } = req.params;
  const { newTitle } = req.body;

  try {
    const result = await pool.query(
      'UPDATE chats SET title = $1 WHERE id = $2 RETURNING *',
      [newTitle, chatId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to rename chat' });
  }
};

// Delete a chat
const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    await pool.query('DELETE FROM messages WHERE chat_id = $1', [chatId]);
    await pool.query('DELETE FROM chats WHERE id = $1', [chatId]);
    res.json({ message: 'Chat deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};

module.exports = { createNewChat, sendMessageToChat, getAllChats , getMessagesByChatId, renameChat,deleteChat };
