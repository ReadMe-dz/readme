const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const {
  getRequests,
  getRequestsByUserId,
  getRequestsCount,
  postRequest,
  deleteRequest,
  patchRequest,
  postCommentRequest,
  deleteCommentRequest,
} = require('../controllers/requests');

const requestsRouter = express.Router();

requestsRouter.get('/count', getRequestsCount);

requestsRouter.get('/user/:id/:page', tokenVerification, getRequestsByUserId);

requestsRouter.get('/:page', getRequests);

requestsRouter.post('/', tokenVerification, postRequest);

requestsRouter.delete('/:id', tokenVerification, deleteRequest);

requestsRouter.patch('/:id', tokenVerification, patchRequest);

requestsRouter.post('/add-comment', tokenVerification, postCommentRequest);

requestsRouter.post('/delete-comment', tokenVerification, deleteCommentRequest);

module.exports = requestsRouter;
