const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const {
  getMessages,
  getMessagesByUserId,
  getChatList,
} = require('../controllers/messages');

const messagesRouter = express.Router();

messagesRouter.get('/chat-list', tokenVerification, getChatList);

messagesRouter.get('/:id', tokenVerification, getMessagesByUserId);

messagesRouter.get('/', tokenVerification, getMessages);

module.exports = messagesRouter;
