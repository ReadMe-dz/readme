const express = require("express");

const booksRouter = express.Router();

const tokenVerification = require("../middleware/token-verification");
const booksController = require("../controllers/books.controller");
const uploads = require("../middleware/images-upload");

booksRouter.get("/search", booksController.searchBooks);

booksRouter.get("/", booksController.getAllBooks);

booksRouter.get("/:id", booksController.getBookById);

booksRouter.post(
  "/",
  tokenVerification,
  uploads.single("picture"),
  booksController.addBook
);

booksRouter.patch(
  "/:id",
  tokenVerification,
  uploads.single("picture"),
  booksController.updateBook
);

booksRouter.delete("/:id", tokenVerification, booksController.deleteBook);

module.exports = booksRouter;
