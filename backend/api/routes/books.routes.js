const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const uploads = require('../middleware/images-upload');
const {
  addBook,
  deleteBook,
  getAllBooksByUserId,
  getAllBooks,
  getBookById,
  getBookDetails,
  searchBooks,
  updateBook,
} = require('../controllers/books');

const booksRouter = express.Router();

booksRouter.get('/search', searchBooks);

booksRouter.get('/', getAllBooks);

booksRouter.get('/:id', getBookById);

booksRouter.get('/details/:id', getBookDetails);

booksRouter.get('/user/:id', getAllBooksByUserId);

booksRouter.post('/', tokenVerification, uploads.single('cover'), addBook);

booksRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('cover'),
  updateBook
);

booksRouter.delete('/:id', tokenVerification, deleteBook);

module.exports = booksRouter;
