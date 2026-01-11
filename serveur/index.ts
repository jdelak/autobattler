import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { GameRoom } from "./rooms/GameRoom";

const app = express();
const server = createServer(app);
const gameServer = new Server({ server });

gameServer.define("game", GameRoom);

const PORT = 2567;
server.listen(PORT, () => {
  console.log(`🚀 Serveur Colyseus lancé sur ws://localhost:${PORT}`);
});