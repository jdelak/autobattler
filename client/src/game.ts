import Phaser from "phaser"
import { BootScene } from "./scenes/BootScene"
import { LoginScene } from "./scenes/LoginScene"
// import { LobbyScene } from "./scenes/LobbyScene"
// import { BattleScene } from "./scenes/BattleScene"
// import { ResultScene } from "./scenes/ResultScene"

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: "#1a1a1a",
  parent: "game-container",
  scene: [
    BootScene,
    LoginScene,
    // LobbyScene,
    // BattleScene,
    // ResultScene
  ],
  physics: {
    default: "arcade"
  }
}

export const game = new Phaser.Game(gameConfig)
