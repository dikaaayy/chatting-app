const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room, messageData) => {
    socket.join(room);
    socket.to(room).emit("receive_message", messageData);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("user_dc", (room, text) => {
    socket.to(room).emit("receive_message", text);
    console.log(`user dc ${socket.id}`);
    socket.disconnect(true);
  });

  socket.on("change_room", (prevRoom, nextRoom, prevRoomText, nextRoomText) => {
    socket.to(prevRoom).emit("receive_message", prevRoomText);
    socket.leave(prevRoom);
    socket.join(nextRoom);
    socket.to(nextRoom).emit("receive_message", nextRoomText);
    console.log(`User with ID: ${socket.id} changed from room ${prevRoom} to room ${nextRoom}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(process.env.PORT || 3001, () => {
  console.log("SERVER RUNNING");
});
