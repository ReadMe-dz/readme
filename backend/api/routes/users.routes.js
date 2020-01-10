const express = require("express")
const users_router = express.Router()

const token_verification = require("../middleware/token-verification")
const users_controller = require("../controllers/users.controller")
const uploads = require("../middleware/images-upload")

users_router.get("/search", users_controller.search_users)

users_router.get("/", users_controller.get_all_users)

users_router.get("/:id", users_controller.get_user_by_id)

users_router.post("/", uploads.single("picture"), users_controller.add_user)

users_router.patch("/:id", token_verification, uploads.single("picture"), users_controller.update_user)

users_router.delete("/:id", token_verification, users_controller.delete_user)

users_router.post("/login", users_controller.login_user)

module.exports = users_router
