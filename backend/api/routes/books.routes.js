const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const uploads = require('../middleware/images-upload');
const {
  postBook,
  deleteBook,
  getAllBooksByUserId,
  getAllBooks,
  getBookById,
  getBookDetails,
  getSearchBooks,
  patchBook,
} = require('../controllers/books');

const booksRouter = express.Router();

booksRouter.get('/search', getSearchBooks);

booksRouter.get('/', getAllBooks);

booksRouter.get('/:id', getBookById);

booksRouter.get('/details/:id', getBookDetails);

booksRouter.get('/user/:id', getAllBooksByUserId);

booksRouter.post('/', tokenVerification, uploads.single('cover'), postBook);

booksRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('cover'),
  patchBook
);

booksRouter.delete('/:id', tokenVerification, deleteBook);

module.exports = booksRouter;
