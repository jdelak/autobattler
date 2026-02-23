import Phaser from "phaser"

export class LoginScene extends Phaser.Scene {

  constructor() {
    super("LoginScene")
  }

  create() {
    this.add.text(400, 300, "Champion of Newerth", {
      fontSize: "40px"
    })

    this.add.text(400, 360, "Clique pour continuer", {
      fontSize: "20px"
    })

    this.input.once("pointerdown", () => {
      this.scene.start("LobbyScene")
    })
  }
}
