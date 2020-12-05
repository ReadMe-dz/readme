module.exports = (wsInstance) => (ws) => {
  ws.on('message', (message) => {
    ws.broadcast(message);
  });

  ws.broadcast = (data) => {
    wsInstance.getWss().clients.forEach((client) => {
      client.send(data);
    });
  };
};
