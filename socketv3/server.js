const app = require('express')();
const server = require('http').createServer(app);

const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    //allowedHeaders: ["my-custom-header"],
    //credentials: true
  }
};

const io = require('socket.io')(server, options);

app.get('/', (req, res) => {
  res.send("Node Server is running. Yay!!")
})


io.on('connection', socket => {

  console.log("Nueva Conexion", socket.id);

  /*   const myRoom =  socket.handshake.query.id;
    console.log(myRoom);
    socket.join(myRoom);


    socket.on("msg", (DATA) => {
      io.Sockets.in(myRoom).emit("msg". { some: "thing"});
    });

   */

  socket.on("msg", (module) => {
    console.log("msg ", module);
  });


  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data)
  });

  socket.on("msg", (data) => {
    console.log(data);
  })

});

server.listen(process.env.PORT || 3000);