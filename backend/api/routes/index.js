const booksRouter = require('./books.routes');
const usersRouter = require('./users.routes');
const reportsRouter = require('./reports.routes');
const commentsRouter = require('./comments.routes');
const messagesRouter = require('./messages.routes');
const requestsRouter = require('./requests.routes');
const errorsRouter = require('./errors.routes');

module.exports = {
  booksRouter,
  usersRouter,
  reportsRouter,
  commentsRouter,
  messagesRouter,
  requestsRouter,
  errorsRouter,
};
