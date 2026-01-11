import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
    @type("string") id!: string;
    @type("number") x!: number;
    @type("number") z!: number;
    @type("string") color!: string;
}

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

export class GameRoom extends Room<GameState> {
  onCreate() {
    this.setState(new GameState());
  }

  onJoin(client: Client) {
    const player = new Player();
    player.id = client.sessionId;
    player.x = Math.random() * 10 - 5;
    player.z = Math.random() * 10 - 5;
     // 🎨 couleur aléatoire
    player.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    this.state.players.set(client.sessionId, player);
    console.log(`➕ Client connecté : ${client.sessionId}`);
    this.broadcast("playerJoined", {
        id: player.id,
        x: player.x,
        z: player.z,
        color: player.color
    });
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    console.log(`➖ Client déconnecté : ${client.sessionId}`);
  }
}