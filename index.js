const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 3300
const server = http.createServer(app)

server.listen(PORT, () => console.log(`The Server is running on port: ${PORT}`))