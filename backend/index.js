const http = require('http');
const api = require('./api');
require('dotenv').config();

const PORT = process.env.PORT || 3300;
const server = http.createServer(api);

server.listen(PORT, () => console.log(`[+] server running on port: ${PORT}`));
