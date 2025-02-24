const net = require('net');

const port = 8001;

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = JSON.parse(data.toString());
    console.log(`Received request from client ${request.clientId} with timestamp ${request.timestamp}`);
    
    // Simulate access to resource R with a critical section
    setTimeout(() => {
      console.log(`Client ${request.clientId} is accessing the resource R`);
      // Simulate critical section with sleep
      setTimeout(() => {
        console.log(`Client ${request.clientId} has finished accessing the resource R`);
        socket.write('COMMITTED');
      }, 2000); // Simulate critical section processing time
    }, 1000); // Simulate some initial processing time
  });

  socket.on('close', () => {
    console.log('Connection closed');
  });
});

server.listen(port, 'localhost', () => {
  console.log(`Cluster Sync Node listening on port ${port}`);
});