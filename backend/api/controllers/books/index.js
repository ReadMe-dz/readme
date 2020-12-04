const postBook = require('./postBook');
const deleteBook = require('./deleteBook');
const getAllBooksByUserId = require('./getAllBooksByUserId');
const getAllBooks = require('./getAllBooks');
const getBookById = require('./getBookById');
const getBookDetails = require('./getBookDetails');
const getSearchBooks = require('./getSearchBooks');
const patchBook = require('./patchBook');
const postHeartBook = require('./postHeartBook');

module.exports = {
  postBook,
  deleteBook,
  getAllBooksByUserId,
  getAllBooks,
  getBookById,
  getBookDetails,
  getSearchBooks,
  patchBook,
  postHeartBook,
};
