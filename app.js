const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL || "localhost"
const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || "books"

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, { useUnifiedTopology: true, useNewUrlParser: true })

const books_router = require("./api/routes/books.routes")
const users_router = require("./api/routes/users.routes")
const errors_router = require("./api/routes/errors.routes")

app.use(cors())
app.use(bodyParser.json())

app.use("/books", books_router)
app.use("/users", users_router)
app.use(errors_router)

module.exports = app