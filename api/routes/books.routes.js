const express = require("express")
const books_router = express.Router()

const token_verification = require("../middleware/token-verification")
const books_controller = require("../controllers/books.controller")

books_router.get("/search", books_controller.search_books)

books_router.get("/", books_controller.get_all_books)

books_router.get("/:id", books_controller.get_book_by_id)

books_router.post("/", token_verification, books_controller.add_book)

books_router.patch("/:id", token_verification, books_controller.update_book)

books_router.delete("/:id", token_verification, books_controller.delete_book)

module.exports = books_router