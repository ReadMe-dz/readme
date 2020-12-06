const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const { getCommentsByBookId, postComment } = require('../controllers/comments');

const commentsRouter = express.Router();

commentsRouter.get('/:id', tokenVerification, getCommentsByBookId);

commentsRouter.post('/', tokenVerification, postComment);

module.exports = commentsRouter;
