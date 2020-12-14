const getRequestsCount = require('./getRequestsCount');
const getRequestsCountByUserId = require('./getRequestsCountByUserId');
const getRequests = require('./getRequests');
const getRequestsByUserId = require('./getRequestsByUserId');
const postRequest = require('./postRequest');
const deleteRequest = require('./deleteRequest');
const patchRequest = require('./patchRequest');
const postCommentRequest = require('./postCommentRequest');
const deleteCommentRequest = require('./deleteCommentRequest');

module.exports = {
  getRequestsCount,
  getRequestsCountByUserId,
  getRequests,
  getRequestsByUserId,
  postRequest,
  deleteRequest,
  patchRequest,
  postCommentRequest,
  deleteCommentRequest,
};
