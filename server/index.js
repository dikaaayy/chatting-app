const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const messagesRouter = require('./routes/messages');
const userRoomsRouter = require('./routes/userRooms');
const prisma = require('./prisma');
const logger = require('./logger'); // Import the logger

app.use(cors());

const server = http.createServer(app);

const allowedOrigins = ["http://172.17.0.3", "http://127.0.0.1", "http://192.168.0.30"];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  },
});

app.use('/api/messages', messagesRouter);
app.use('/api/userrooms', userRoomsRouter);

io.on("connection", (socket) => {
  logger.info(`CONNECTED - SOCKET: ${socket.id}`);

  socket.on("join_room", async ({ room, userId, userName, image_url }) => {
    socket.join(room);
    logger.info(`JOIN - UserID: ${userId} - SOCKET: ${socket.id} - ROOM: ${room}`);
    try {
      // Ensure the user exists, or create them if they don't
      const user = await prisma.user.upsert({
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
      // Add the user to the room
      await prisma.userRoom.upsert({
        where: {
          userId_roomId: {
            userId: userId,
            roomId: roomRecord.id,
          },
        },
        update: {}, // No fields to update; just check if the relationship exists
        create: {
          user: { connect: { id: userId } },
          room: { connect: { id: roomRecord.id } },
        },
      });
    } catch (error) {
      logger.error("Error handling room join:", error);
    }
  });

  socket.on("user_dc", (room, text) => {
    socket.to(room).emit("receive_message", text);
    logger.info(`DISCONNECT: ${socket.id}`);
    socket.disconnect(true);
  });

  socket.on("change_room", (prevRoom, nextRoom, prevRoomText, nextRoomText) => {
    socket.to(prevRoom).emit("receive_message", prevRoomText);
    socket.leave(prevRoom);
    socket.join(nextRoom);
    socket.to(nextRoom).emit("receive_message", nextRoomText);
    logger.info(`User with ID: ${socket.id} changed from room ${prevRoom} to room ${nextRoom}`);
  });

  socket.on("send_message", async (data) => {
    const { room, user, content } = data;
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
      logger.info(`MESSAGE - SOCKET: ${socket.id}`);
      socket.to(room).emit("receive_message", newMessage);
    } catch (error) {
      logger.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    logger.info(`DISCONNECT - SOCKET: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(process.env.PORT || 4001, () => {
  logger.info("SERVER RUNNING");
});
