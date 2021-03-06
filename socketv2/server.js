const app = require('express')()
const http = require('http').createServer(app)


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    console.log('connection', userSocket.id);
    userSocket.on("send_message", (data) => {
        console.log(data);
        userSocket.broadcast.emit("receive_message", data)
    });

    userSocket.on("msg", (data) => {
        console.log(data);        
    })



})

http.listen(process.env.PORT || 3000)