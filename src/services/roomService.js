const { redis } = require("../configs/redis");

const generatePlayersStats = require("../utils/generatePlayersStats");
const getRandomArrayValue = require("../utils/getRandomArrayValue");
const getRandomUnique = require("../utils/getRandomUnique");

const apocalypses = require("../data/game/apocalypses");
const places = require("../data/game/places");
const resources = require("../data/game/resources");

async function getRooms() {
  const keys = await redis.keys("*");
  if (keys.length === 0) return [];

  const rooms = await redis.mget(keys);
  const parsedRooms = rooms
    .map((room) => {
      try {
        return JSON.parse(room);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return parsedRooms;
}

async function createRoom(ownerId, roomId) {
  const roomData = {
    id: roomId,
    apocalypses: getRandomArrayValue(apocalypses),
    room: getRandomArrayValue(places),
    playersStats: [],
    ownerId,
    resources: getRandomUnique(resources, 3),
    status: "ongoing",
  };

  await redis.set(roomId, JSON.stringify(roomData));
  return roomData;
}

async function startRoom(roomId) {
  const existing = await getRoomData(roomId);
  if (!existing) return null;

  const newPlayersStats = await generatePlayersStats(playersIds);

  const roomData = { ...existing, ...newPlayersStats };
  await redis.set(roomId, JSON.stringify(roomData));
  return roomData;
}

async function getRoomData(roomId) {
  const data = await redis.get(roomId);
  return data ? JSON.parse(data) : null;
}

async function updateRoom(roomId, updates) {
  const existing = await getRoomData(roomId);
  if (!existing) return null;

  const updated = { ...existing, ...updates };
  await redis.set(roomId, JSON.stringify(updated));
  return updated;
}

module.exports = {
  getRooms,
  createRoom,
  startRoom,
  getRoomData,
  updateRoom,
};
