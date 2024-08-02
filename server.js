const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

// Crea la aplicación Express
const app = express();

// Configura CORS
app.use(cors());

// Define un endpoint (opcional)
app.get('/', (req, res) => {
  res.send('Servidor WebSocket en funcionamiento');
});

// Inicia el servidor HTTP
const server = app.listen(4200, () => {
  console.log('HTTP server is running on http://localhost:8080');
});

// Crea el servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message); // Intenta parsear el mensaje
      console.log('Parsed message:', parsedMessage);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return; // Si hay un error, no envíes el mensaje
    }

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage)); // Envía como JSON
      }
    });
  });

  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server' }));
});

console.log('WebSocket server is running on ws://localhost:8080');
