const express = require('express');
const cors = require('cors');
const path = require('path');
const connect = require('./db/connect');
const deleteOldRequests = require('./crons');
const {
  booksRouter,
  usersRouter,
  reportsRouter,
  commentsRouter,
  messagesRouter,
  errorsRouter,
  requestsRouter,
} = require('./routes');

const app = express();
connect();

app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cors());
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/comments', commentsRouter);
app.use('/messages', messagesRouter);
app.use('/requests', requestsRouter);
app.use(errorsRouter);

deleteOldRequests();

module.exports = app;
