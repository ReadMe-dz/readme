const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Book = require("../models/book.model");

const searchBooks = (req, res) => {
  const { search } = req.query;

  const find = {
    $or: [
      { title: new RegExp(search, "gi") },
      { author: new RegExp(search, "gi") },
    ],
  };

  Book.find(find)
    .populate("user", "_id name picture wilaya")
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, books: result })
    )
    .catch((error) => res.status(500).json(error));
};

const getAllBooks = (req, res) => {
  Book.find()
    .populate("user", "_id name picture wilaya")
    .exec()
    .then((result) => {
      res.status(200).json({ count: result.length, books: result });
    })
    .catch((error) => res.status(500).json(error));
};

const getBookById = (req, res) => {
  Book.findById(req.params.id)
    .populate("user", "_id name username picture wilaya") // add more fields for details
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: { message: "Not Found" } });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate(
        "user",
        "_id email name username wilaya moreInfo picture birthdate phone facebook twitter"
      )
      .exec();
    const userBooks = await Book.find({ user: book.user.id })
      .populate("user", "_id name picture wilaya")
      .limit(5)
      .exec();
    const relatedBooks = await Book.find({
      _id: { $ne: book._id },
      $or: [
        { author: new RegExp(book.author, "i") },
        { title: new RegExp(book.title, "i") },
        { genre: book.genre, language: book.language },
      ],
    })
      .populate("user", "_id name picture wilaya")
      .limit(10)
      .exec();

    res.status(200).json({ book, userBooks, relatedBooks });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllBooksByUserId = (req, res) => {
  Book.find({ user: req.params.id })
    .select(
      "_id user title author publisher cover details language genre state price createdAt year "
    )
    .populate("user", "_id name username picture wilaya") // add more fields for details
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: { message: "Not Found" } });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const addBook = (req, res) => {
  const {
    title,
    author,
    user,
    price,
    publisher,
    details,
    language,
    genre,
    state,
    year,
  } = req.body;
  // add validations & error messages

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
    user,
    publisher,
    details,
    language,
    genre,
    state,
    price,
    year,
  });

  if (req.file) {
    book.cover = req.file.path;
  } else {
    book.cover = "api/uploads/books/0321661312364.png";
  }

  book
    .save()
    .then((result) => res.status(201).json({ created: result, success: true }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req, res) => {
  const {
    title,
    author,
    user,
    price,
    publisher,
    details,
    language,
    genre,
    state,
    year,
  } = req.body;

  const newBook = {
    title,
    author,
    user,
    price,
    publisher,
    details,
    language,
    genre,
    state,
    year,
  };

  if (req.file && req.file.path) {
    Book.findById(req.params.id)
      .exec()
      .then(({ cover }) => {
        if (cover && cover !== "api/uploads/users/0321661312364.png") {
          fs.unlinkSync(path.join(__dirname, `../../${cover}`));
        }
        newBook.cover = req.file.path;
        Book.updateOne({ _id: req.params.id }, { $set: newBook })
          .exec()
          .then(() =>
            res.status(200).json({ updated_id: req.params.id, success: true })
          )
          .catch((error) => res.status(500).json(error));
      })
      .catch((error) => res.status(500).json(error));
  } else {
    Book.updateOne({ _id: req.params.id }, { $set: newBook })
      .exec()
      .then(() =>
        res.status(200).json({ updated_id: req.params.id, success: true })
      )
      .catch((error) => res.status(500).json(error));
  }
};

const deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).json({ deleteId: req.params.id, success: true });
    })
    .catch((error) => res.status(500).json(error));
};

module.exports = {
  searchBooks,
  getAllBooks,
  getBookById,
  getBookDetails,
  getAllBooksByUserId,
  addBook,
  updateBook,
  deleteBook,
};
