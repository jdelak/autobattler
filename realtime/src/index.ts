import { Server } from "colyseus"
import express from "express"
import http from "http"
import { BattleRoom } from "./rooms/BattleRoom"

const port = 2567

const app = express()
const server = http.createServer(app)

const gameServer = new Server({
  server
})

gameServer.define("battle", BattleRoom)

server.listen(port, () => {
  console.log(`🚀 Colyseus running on ws://localhost:${port}`)
})
