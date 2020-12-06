const http = require('http');
const socket = require('socket.io');
const api = require('./api');
const { WSComments } = require('./api/controllers/comments');
require('dotenv').config();

const PORT = process.env.PORT || 3300;
const server = http.createServer(api);
WSComments(socket(server));

server.listen(PORT, () => console.log(`[+] server running on port: ${PORT}`));
