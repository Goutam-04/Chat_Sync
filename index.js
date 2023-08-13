const express = require("express")

const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const app=express();

app.use(cors());

const port = process.env.PORT||8080;

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("join_server",(data)=>{
        socket.join(data.room);
        console.log(`user with ID: ${socket.id} joined the room ${data.room}`);

    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
        console.log(`user recive the message`);
        
    })

    socket.on("disconnect",()=>{
        console.log(`user disconnected `,socket.id);
    })
    
  });

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})