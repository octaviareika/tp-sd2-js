const net = require('net');
const { v4: uuidv4 } = require('uuid');

const clientId = uuidv4();
const clusterNode = { host: 'localhost', port: 8000 };

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function requestAccess() {
  const client = new net.Socket();
  client.connect(clusterNode.port, clusterNode.host, () => {
    const timestamp = Date.now();
    const message = JSON.stringify({ clientId, timestamp });
    client.write(message);
  });

  client.on('data', (data) => {
    const response = data.toString();
    if (response === 'COMMITTED') {
      console.log(`Client ${clientId} received COMMITTED`);
      client.destroy();
      setTimeout(requestAccess, getRandomInt(1000, 5000));
    }
  });

  client.on('close', () => {
    console.log(`Client ${clientId} connection closed`);
  });
}

for (let i = 0; i < getRandomInt(10, 50); i++) {
  requestAccess();
}