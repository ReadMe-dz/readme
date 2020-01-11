const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        req.verified_token = jwt.verify(token, process.env.JWT_KEY || "G0-p2^vPj1/6$vE[aK1vM3$5")

        next()
    } catch (error) {
        res.status(401).json({ message: "Auth Failed." })
    }
}