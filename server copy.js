const { Socket } = require('dgram');

const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', socket => {

  console.log("Nueva Conexion", socket.id);

/*   const myRoom =  socket.handshake.query.id;
  console.log(myRoom);
  socket.join(myRoom);


  socket.on("msg", (DATA) => {
    io.Sockets.in(myRoom).emit("msg". { some: "thing"});
  });

 */
  socket.emit("hello", {
    some: 'data'
  });

  socket.emit("event", {
    some: 'data'
  });

  socket.on("add", (module) => {
    console.log("add ", module);
  });

  socket.on("msg", (module) => {
    console.log("msg ", module);
  });

});


/* // server-side
io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
}); */

server.listen(3000);