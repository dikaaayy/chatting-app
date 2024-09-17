const express = require('express');
const router = express.Router();
const prisma = require('../prisma')

router.get('/:room', async (req, res) => {
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

module.exports = router;
