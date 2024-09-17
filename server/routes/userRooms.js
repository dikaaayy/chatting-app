const express = require('express');
const router = express.Router();
const prisma = require('../prisma')

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userRoom = await prisma.user.findUnique({
        where: { id },
        include: {
          rooms: {
            include: {
              room: true,
            },
          },
        },
      });
      

    if (!userRoom) {
      return res.status(404).json({ error: "Room not found" });
    }
    
    const room = userRoom.rooms.map(userRoom => userRoom.room)

    res.json(room);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
