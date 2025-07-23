const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController'); // ✅ Use object import

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API Working!' });
});

// Chat routes using the controller object
router.post('/chat', chatController.createNewChat);
router.post('/chat/:chatId/message', chatController.sendMessageToChat);
router.get('/chats', chatController.getAllChats);
router.get('/chat/:chatId', chatController.getMessagesByChatId);

// ✅ Rename and delete routes
router.put('/:chatId/rename', chatController.renameChat);
router.delete('/:chatId', chatController.deleteChat);

module.exports = router;
