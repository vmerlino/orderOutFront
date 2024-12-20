const WebSocket = require('ws');

// Crear un servidor WebSocket en el puerto 4200
const server = new WebSocket.Server({ port: 4200 });

server.on('connection', (socket) => {
  console.log('New client connected');

  // Cuando el servidor recibe un mensaje desde cualquier cliente
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Enviar el mensaje a todos los clientes conectados
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // retransmitir el mensaje a los otros clientes
      }
    });
  });

  // Mensaje de desconexión
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:4200');
