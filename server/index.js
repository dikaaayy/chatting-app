const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const prisma = new PrismaClient();

  app.get("/api/messages/:room", async (req, res) => {
    const { room } = req.params;
    try {
      const roomRecord = await prisma.room.findUnique({
        where: { name: room },
      });

      if (!roomRecord) {
        return res.status(404).json({ error: "Room not found" });
      }

      const messages = await prisma.message.findMany({
        where: { roomId: roomRecord.id },
        include: { user: true },
        orderBy: { timestamp: 'asc' },
      });

      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address;
  console.log(`User Connected: ${socket.id} with IP ${clientIp}`);

  // socket.on("join_room", (room) => {
  //   socket.join(room);
  //   // socket.to(room).emit("receive_message", messageData);
  //   console.log(`User with ID: ${socket.id} joined room: ${room}`);
  // });

  socket.on("join_room", async ({ room, userId, userName, image_url }) => {
    socket.join(room);
    console.log(`JOIN - User with ID: ${userId} and Socket ID: ${socket.id} joined room: ${room} TIME ${new Date().toISOString()}`);
    try {
      // Ensure the user exists, or create them if they don't
      await prisma.user.upsert({
        where: { id: userId },
        update: {}, // No fields to update; just check if the user exists
        create: { id: userId, name: userName, image_url }, // Create the user if not found
      });
  
      // Ensure the room exists, or create it if it doesn't
      const roomRecord = await prisma.room.upsert({
        where: { name: room },
        update: {}, // No update needed since it's just a check
        create: { name: room },
      });
  
      // Fetch previous messages for the room from the database
      const messages = await prisma.message.findMany({
        where: { roomId: roomRecord.id },
        include: { user: true },
        orderBy: { timestamp: 'asc' },
      });
      // Emit previous messages to the client
      socket.emit("previous_messages", messages);
    } catch (error) {
      console.error("Error handling room join:", error);
    }
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

  socket.on("send_message", async (data) => {
    const { room, user, content} = data;
    try {
      // Save the message to the database
      const newMessage = await prisma.message.create({
        data: {
          content,
          room: { connect: { name: room } },
          user: { connect: { id: user.userId } },
        },
        include: { user: true, room: true },
      });
      console.log(`new message FROM: ${user.name} AND ${socket.id} TIME ${new Date().toISOString()}`)
      socket.to(room).emit("receive_message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(process.env.PORT || 4000, () => {
  console.log("SERVER RUNNING");
});
