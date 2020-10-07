const express = require('express');
const httpProxy = require('http-proxy');
const server = require('http');

const app = express();
const port = process.env.PORT || 5000;
const appServer = server.createServer(app);

const apiProxy = httpProxy.createProxyServer(app);
const wsProxy = httpProxy.createProxyServer({
  target:  process.env.NOTIFICATION_HOST || 'http://localhost:3002',
  ws: true,
});


apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
}); 

wsProxy.on('error', (err, req, socket) => {
  console.log(err);
  console.log('ws failed');
  socket.end();
});


// api for auth service
const authServer = process.env.AUTHENTICATION_END || 'http://localhost:3001';
app.all("/api/auth/*", (req, res) => {
  apiProxy.web(req, res, { target: authServer });
});

// api for transaction service
const transactionServer = process.env.TRANSACTION_END || 'http://localhost:3003';
app.all("/api/transaction", (req, res) => {
  apiProxy.web(req, res, { target: transactionServer });
});

// api for inventory service
const inventory = process.env.INVENTORY_END || 'http://localhost:3004';
app.all("/api/item/*", (req, res) => {
  apiProxy.web(req, res, { target: inventory });
});


// redirection for websockets
const websocketHost = process.env.NOTIFICATION_HOST || 'http://localhost:3002/websocket';
console.log(`WebSocket end proxies to: ${websocketHost}`);
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: websocketHost });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  wsProxy.ws(req, socket, head);
});

// api for receipt service
const fronEndHost = process.env.FRONT_END_HOST || 'http://localhost:3000';

app.all("*", (req, res) => {
  // front end server -> react
  apiProxy.web(req, res, { target: fronEndHost });

});

appServer.listen(port, () => console.log(`Gateway on port ${port}!`))