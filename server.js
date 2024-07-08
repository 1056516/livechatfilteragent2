// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = []; // Store messages persistently

wss.on('connection', (ws) => {
    // Send all previous messages to just connected clients
    ws.send(JSON.stringify(messages));

    ws.on('message', (message) => {
        messages.push(message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
