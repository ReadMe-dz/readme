const express = require("express")
const users_router = express.Router()

const token_verification = require("../middleware/token-verification")
const { search_users, get_user_by_id, add_user, update_user, delete_user, login_user, load_user } = require("../controllers/users.controller")
const uploads = require("../middleware/images-upload")

users_router.get("/search", search_users)

users_router.get("/:id", get_user_by_id)

users_router.post("/", uploads.single("picture"), add_user)

users_router.patch("/:id", token_verification, uploads.single("picture"), update_user)

users_router.delete("/:id", token_verification, delete_user)

users_router.post("/login", login_user)

users_router.get("/", token_verification, load_user)

module.exports = users_router
