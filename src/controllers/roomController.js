const roomService = require("../services/roomService");

const getRooms = async (req, res) => {
  try {
    const rooms = await roomService.getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

const createRoom = async (req, res) => {
  const { ownerId, roomId } = req.body;

  try {
    const room = await roomService.createRoom(ownerId, roomId);
    res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room" });
  }
};

const startRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await roomService.startRoom(id);
    res.status(201).json(room);
  } catch (error) {
    console.error("Error starting room:", error);
    res.status(500).json({ message: "Failed to start room" });
  }
};

const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await roomService.getRoomData(id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Failed to fetch room" });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await roomService.updateRoom(id, updates);
    if (!updated) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Failed to update room" });
  }
};

module.exports = {
  getRooms,
  createRoom,
  startRoom,
  getRoom,
  updateRoom,
};
