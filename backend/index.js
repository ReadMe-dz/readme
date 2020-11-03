const http = require("http");
const api = require("./api");

const PORT = process.env.PORT || 3300;
const server = http.createServer(api);

server.listen(PORT, () => console.log(`[+] server running on port: ${PORT}`));
