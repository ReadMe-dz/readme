const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const path = require('path');
const connect = require('./db/connect');

const app = express();
const ws = expressWs(app);
connect();

const booksRouter = require('./routes/books.routes');
const usersRouter = require('./routes/users.routes');
const reportsRouter = require('./routes/reports.routes');
const commentsRouter = require('./routes/comments.routes');
const errorsRouter = require('./routes/errors.routes');
const { commentsWS } = require('./controllers/comments');

app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cors());
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/comments', commentsRouter);
app.use(errorsRouter);

app.ws('/comments', commentsWS(ws));

module.exports = app;
