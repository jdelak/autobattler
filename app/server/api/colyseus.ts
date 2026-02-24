import { Server } from "colyseus";
import { MyRoom } from "~/server/rooms/MyRoom";

export default defineEventHandler(async (event) => {
  const gameServer = new Server();
  gameServer.define("my_room", MyRoom);
  // Logique pour gérer les connexions WebSocket...
});