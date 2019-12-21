const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        req.verified_token = jwt.verify(token, process.env.JWT_KEY || "What The Fuck")

        next()
    } catch (error) {
        res.status(401).json({ message: "Auth Failed." })
    }
}