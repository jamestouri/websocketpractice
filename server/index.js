const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8000;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {

  socket.on('message', data => {
    wss.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})



server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
})
