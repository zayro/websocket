const WebSocket = require('ws');
const http = require('http');
const url = require('url');

const express = require('express');
const app = express();

//app.use(express.static('public'));
const server = http.createServer(app);
const webPort = 3000;

server.listen(webPort, function () {
  console.log('Web server start. http://localhost:' + webPort);
});
const wss = new WebSocket.Server({
  server: server
});


function isJSON(str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
}

wss.on('connection', (ws, req) => {

  console.log(req.socket.remoteAddress);

  console.log(req.headers);
  
  ws.room = [];
  ws.send(JSON.stringify({
    msg: "user joined"
  }));
  console.log('connected');
  ws.on('message', message => {
    console.log('message: ', message);
    try {
      messag = isJSON(message) ? JSON.parse(message) : {};
    } catch (e) {
      console.log(e)
    }
    if (messag.join) {
      ws.room.push(messag.join)

    }
    // Room
    if (messag.room) {
      broadcast(messag);
    }
    // Message
    if (messag.msg) {
      console.log('message: ', messag.msg)
    }
  })

  ws.on('error', e => console.log(e))
  ws.on('close', (e) => console.log('websocket closed: ' + e))

})

/* server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
  console.log(`TCL:  ---------------------------------------------------------------`);
  console.log(`TCL:  ~ file: index.js ~ line 66 ~ upgrade ~ pathname`, pathname);
  console.log(`TCL:  ---------------------------------------------------------------`);
 
});
 */

const broadcast = (message) => {

  wss.clients.forEach(client => {
    console.log(client.room);
    console.log(message.room);
    console.log(client.room.indexOf(message.room));
    if (client.room.indexOf(message.room) === 0) {
      /*   if (client !== wss && client.readyState === WebSocket.OPEN) {
          
        } */

      console.log("ROOM found");

      client.send(message.msg);

    } else {
      console.log("ROOM not found");
    }
  })

}