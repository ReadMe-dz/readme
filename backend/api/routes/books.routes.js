const express = require('express');

const booksRouter = express.Router();

const tokenVerification = require('../middleware/token-verification');
const booksController = require('../controllers/books.controller');
const uploads = require('../middleware/images-upload');

booksRouter.get('/search', booksController.searchBooks);

booksRouter.get('/', booksController.getAllBooks);

booksRouter.get('/:id', booksController.getBookById);

booksRouter.get('/details/:id', booksController.getBookDetails);

booksRouter.get('/user/:id', booksController.getAllBooksByUserId);

booksRouter.post(
  '/',
  tokenVerification,
  uploads.single('cover'),
  booksController.addBook
);

booksRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('cover'),
  booksController.updateBook
);

booksRouter.delete('/:id', tokenVerification, booksController.deleteBook);

module.exports = booksRouter;
