const express = require("express")
const errors_router = express.Router()

errors_router.use((req, res, next) => {
    let error = new Error("Not Found")
    error.status = 404
    next(error)
})

errors_router.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message,
                method: req.method,
                url: req.url
            }
        })
})

module.exports = errors_router