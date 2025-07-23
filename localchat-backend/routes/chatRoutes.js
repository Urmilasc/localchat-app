const express = require('express');
const router = express.Router();
const {createNewChat } = require('../controllers/chatController');
const { sendMessageToChat} = require('../controllers/chatController');
const {getAllChats} = require('../controllers/chatController');
const {getMessagesByChatId} = require('../controllers/chatController');


router.get('/test', (req, res) => {
  res.json({ message: 'API Working!' });
});

router.post('/chat' , createNewChat);

router.post('/chat/:chatId/message', sendMessageToChat);
router.get('/chats', getAllChats);
router.get('/chat/:chatId', getMessagesByChatId);

module.exports = router;
